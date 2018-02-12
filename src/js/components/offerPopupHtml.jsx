import React, { Component } from 'react';
import _ from 'lodash';

import { setChromeStorageData, getChromeStorageData } from '../helpers';
import { storageBlackListKey, storageFrozenListKey, storageCredentialsKey, messages } from '../constants';

class OfferPopUp extends Component {
    constructor() {
        super();

        this.state = {
            showForm: true,
            massage: '',
            cancel: false
        }
    }

    saveCredentials(current) {
        getChromeStorageData(storageCredentialsKey).then(data => {
            const newData = data[storageCredentialsKey].filter(c => !_.isEqual(c, current)).concat([{
                ...current,
                saved: true
            }]);
            setChromeStorageData({ [storageCredentialsKey]: newData }).then(() => {
                this.setState({ showForm: false, message: messages.passwordSaved });

            })
        })
    }

    cancel(url) {
        getChromeStorageData(storageFrozenListKey).then(data => {
            const newData = data[storageFrozenListKey]
                    .filter(item => item.indexOf(url) !== -1 && url.indexOf(item) !== -1).concat([url]);
            setChromeStorageData({ [storageFrozenListKey]: newData }).then(() => {
                this.setState({ cancel: true });
            })
        })
    }

    addToBlackList(url) {
        getChromeStorageData(storageBlackListKey).then(data => {
            const newData = data[storageBlackListKey]
                    .filter(item => item.indexOf(url) !== -1 && url.indexOf(item) !== -1).concat([url]);
            setChromeStorageData({ [storageBlackListKey]: newData }).then(() => {
                this.setState({ showForm: false, message: messages.websiteToBlackList });
            })
        })
    }

    render() {
        const { credentials } = this.props;
        const { showForm, message, cancel } = this.state;

        return !cancel && credentials.length && <div className="credentials">
            {showForm ? (
                    credentials.map((item, index) => {
                        return <div key={index} className="item">
                            Would you like save credentials for <strong>{item.url}</strong>?
                            <br/>
                            <div style={{ marginTop: 5 }}><i>Username</i>: {item.email}</div>
                            <div><i>Password</i>: {item.password}</div>
                            <br/>
                            <div style={{ display: 'flex' }}>
                                <button onClick={() => this.saveCredentials(item)}>Yes</button>
                                <button onClick={() => this.cancel(item.url)} style={{ marginLeft: 10 }}>No</button>
                                <button onClick={() => this.addToBlackList(item.url)} style={{ marginLeft: 10 }}>
                                    Never for this site
                                </button>
                            </div>
                        </div>;
                    })
            ) : (
                    message && <p>{message}</p>
            )}
        </div>;
    }
}

export default OfferPopUp;