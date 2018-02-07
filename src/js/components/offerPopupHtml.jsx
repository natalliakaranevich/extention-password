import React, { Component } from 'react';

import { setChromeStorageData, getChromeStorageData, clearSrotage } from '../helpers';
import { storageBlackListKey, storageFrozenListKey, storageCredentialsKey } from '../constants';

class OfferPopUp extends Component {
    saveCredentials(current) {
        getChromeStorageData(storageCredentialsKey, data => {
            setChromeStorageData({[storageCredentialsKey]: data[storageCredentialsKey].concat([current])})
        })
    }

    cancel(url) {
        getChromeStorageData(storageFrozenListKey, data => {
            setChromeStorageData({[storageFrozenListKey]: data[storageFrozenListKey].concat([url])})
        })
    }

    addToBlackList(url) {
        getChromeStorageData(storageBlackListKey, data => {
            setChromeStorageData({[storageBlackListKey]: data.concat([url])})
        })
    }

    render() {
        const { credentials } = this.props;

        return credentials.length && <div className="credentials">
            {credentials.map((item, index) => {
                return <div key={index} className="item">
                    Would you like save credentials for <strong>{item.url}</strong>?
                    <br/>
                    <div style={{marginTop: 5}}><i>Username</i>: {item.email}</div>
                    <div><i>Password</i>: {item.password}</div>
                    <br/>
                    <div style={{display: 'flex'}}>
                        <button onClick={() => this.saveCredentials(item)}>Yes</button>
                        <button onClick={() => this.cancel(item.url)} style={{marginLeft: 10}}>No</button>
                        <button onClick={() => this.addToBlackList(item.url)} style={{marginLeft: 10}}>Never for this site</button>
                    </div>
                </div>;
            })}
        </div>;
    }
}

export default OfferPopUp;