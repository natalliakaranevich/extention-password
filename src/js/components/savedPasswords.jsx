import React, { Component } from 'react';

import { getChromeStorageData, setChromeStorageData } from '../helpers';
import { storageCredentialsKey } from '../constants';

import PasswordItem from './passwordItem.jsx';

class SavedPasswords extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            credentials: null
        };

        getChromeStorageData(storageCredentialsKey).then(data => {
            this.setState({
                credentials: data[storageCredentialsKey],
            });
        });
    }

    updateCredentials(e, index) {
        e.preventDefault();
        getChromeStorageData(storageCredentialsKey).then(data => {
            const { [storageCredentialsKey]: credentials } = data;

            credentials.splice(index, 1);
            setChromeStorageData({ [storageCredentialsKey]: credentials }).then(newData => {
                this.setState({
                    credentials: newData[storageCredentialsKey],
                });
            });
        });
    }

    render() {
        const { credentials } = this.state;

        return credentials && credentials.filter(i => i.saved).length ? (
                <div className="saved-passwords">
                    {credentials.map((item, index) => {
                        return <PasswordItem key={index}
                                             item={item}
                                             index={index}
                                             removeCredentials={(e, index) => this.updateCredentials(e, index)}/>;
                    })}
                </div>
        ) : (
                <p>No saved passwords</p>
        );
    }
}

SavedPasswords.propTypes = {

};

export default SavedPasswords;
