import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { setChromeStorageData, getChromeStorageData } from '../helpers';
import { storageBlackListKey, storageCredentialsKey, messages } from '../constants';
import PasswordItem from './passwordItem.jsx';

class OfferPopUp extends Component {
    constructor(props) {
        super();

        this.state = {
            messages: {},
            cancel: {},
            credentials: props.credentials
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps, this.props)) {
            this.setState({
                credentials: nextProps.credentials
            });
        }
    }

    saveCredentials(current, index) {
        getChromeStorageData(storageCredentialsKey).then(data => {
            const newData = data[storageCredentialsKey].filter(c => !_.isEqual(c, current)).concat([{
                ...current,
                saved: true
            }]);

            setChromeStorageData({ [storageCredentialsKey]: newData }).then(() => {
                this.setState({ messages: { [index]: messages.passwordSaved } });

            });
        });
    }

    cancel(item, index) {
        getChromeStorageData(storageCredentialsKey).then(data => {
            const newData = data[storageCredentialsKey].filter(el => !_.isEqual(el, item));

            setChromeStorageData({ [storageCredentialsKey]: newData }).then(() => {
                this.setState({
                    cancel: { ...this.state.cancel, [index]: true }
                });
            });
        });
    }

    addToBlackList(url, index) {
        getChromeStorageData([storageBlackListKey, storageCredentialsKey]).then(data => {
            const newBlackList = _.unionWith(data[storageBlackListKey].concat([url]), _.isEqual);
            const newCredentials = data[storageCredentialsKey].filter(i => i.url !== url && !i.saved);
            setChromeStorageData({
                [storageBlackListKey]: newBlackList,
                [storageCredentialsKey]: newCredentials
            }).then(() => {
                this.setState({
                    messages: { [index]: messages.websiteToBlackList },
                    credentials: newCredentials
                });
            });
        });
    }

    render() {
        const { messages, cancel, credentials } = this.state;

        return credentials.length && <div className="credentials-wrapper">
            {credentials.map((item, index) => {
                return !cancel[index] ? <div key={index} className="credential">
                    Would you like save credentials for:
                    <PasswordItem item={item}
                                  index={index}
                                  offerSave={true}
                                  message={messages[index]}
                                  cancel={() => this.cancel(item, index)}
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
