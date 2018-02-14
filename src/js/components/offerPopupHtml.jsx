import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { setChromeStorageData, getChromeStorageData } from '../helpers';
import { storageBlackListKey, storageCredentialsKey, messages } from '../constants';
import PasswordItem from './passwordItem.jsx';

class OfferPopUp extends Component {
    constructor() {
        super();

        this.state = {
            messages: {},
            cancel: {}
        };
    }

    saveCredentials(current, index) {
        getChromeStorageData(storageCredentialsKey).then(data => {
            const newData = data[storageCredentialsKey].filter(c => !_.isEqual(c, current)).concat([{
                ...current,
                saved: true
            }]);
            debugger
            setChromeStorageData({ [storageCredentialsKey]: newData }).then(() => {
                this.setState({ messages: { [index]: messages.passwordSaved } });

            });
        });
    }

    cancel(index) {
        getChromeStorageData(storageCredentialsKey).then(data => {
            data[storageCredentialsKey].splice(index, 1);
            setChromeStorageData({ [storageCredentialsKey]: data[storageCredentialsKey] }).then(() => {
                this.setState({
                    cancel: { ...this.state.cancel, [index]: messages.passwordSaved }
                });
            });
        });
    }

    addToBlackList(url, index) {
        getChromeStorageData(storageBlackListKey).then(data => {
            const newData = _.unionWith(data[storageBlackListKey].concat([url]), _.isEqual);
            setChromeStorageData({ [storageBlackListKey]: newData }).then(() => {
                this.setState({ messages: { [index]: messages.websiteToBlackList } });
            });
        });
    }

    render() {
        const { credentials } = this.props;
        const { messages, cancel } = this.state;

        return credentials.length && <div className="credentials-wrapper">
            {credentials.map((item, index) => {
                return !cancel[index] ? <div key={index} className="credential">
                    Would you like save credentials for:
                    <PasswordItem item={item}
                                  index={index}
                                  offerSave={true}
                                  message={messages[index]}
                                  cancel={() => this.cancel(index)}
                                  saveCredentials={(item) => this.saveCredentials(item, index)}
                                  addToBlackList={(url) => this.addToBlackList(url, index)}/>
                </div> : null;
            })}
        </div>;
    }
}

OfferPopUp.propTypes = {
    credentials: PropTypes.array.isRequired
};

export default OfferPopUp;
