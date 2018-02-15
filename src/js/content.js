/* global window, document, setTimeout, console */

import $ from 'jquery';
import _ from 'lodash';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';

import { setChromeStorageData, getChromeStorageData, clearSrotage } from './helpers';
import { storageCredentialsKey, storageBlackListKey } from './constants';

import OfferPopUp from './components/offerPopupHtml.jsx'; // eslint-disable-line no-unused-vars
import '../styles/offerPopup.scss';

const locationOrigin = window.location.origin;
const initialStorage = {
    [storageCredentialsKey]: [],
    [storageBlackListKey]: [],
};
const loginForm = document.getElementsByTagName('form');

// clearSrotage();
class ContentScript {
    constructor(form) {
        this.forms = form;

        this.createContainer();
        this.showOfferPopup({});
        this.handleSubmit();

        document.querySelector('[type="submit"]').addEventListener('mousedown', e => {
            this.password = $(e.target).parent('form').find('#password_input').val();
        });
    }

    createContainer() {
        $('body').append('<div id="#offerPopup" class="offer-popup-container" />');
    }

    handleSubmit() {
        this.forms.length && this.forms.map(form => {

            $(form).on('submit', e => {
                e.preventDefault();
                const thisForm = $(e.target);
                const email = thisForm.find('#email_input');
                const password = thisForm.find('#password_input');

                if (email && password) {
                    const newCredentials = {
                        password: this.password,
                        email: email.val(),
                        url: locationOrigin,
                        saved: false
                    };

                    getChromeStorageData([storageCredentialsKey]).then(data => {
                        const sameItem = data[storageCredentialsKey].find(item => {
                            return item.password === newCredentials.password && item.email === newCredentials.email &&
                                    item.url === newCredentials.url;
                        });
                        const sameForSiteNotSavedIndex = data[storageCredentialsKey].findIndex(item => {
                            return item.url === newCredentials.url && !item.saved;
                        });

                        if (!sameItem) {
                            sameForSiteNotSavedIndex === -1
                                    ? data[storageCredentialsKey].push(newCredentials)
                                    : data[storageCredentialsKey][sameForSiteNotSavedIndex] = newCredentials;
console.log('all', data[storageCredentialsKey]);
console.log('same', data[storageCredentialsKey][sameForSiteNotSavedIndex]);
console.log('newCredentials', newCredentials);
                            setChromeStorageData({ [storageCredentialsKey]: data[storageCredentialsKey] });
                            this.showOfferPopup();
                        }
                    });
                }
            });
        });
    }

    showOfferPopup() {
        getChromeStorageData().then(data => {
            const {
                [storageCredentialsKey]: credentials,
                [storageBlackListKey]: blackList
            } = data;
            const validData = credentials && credentials.length;

            if (validData) {
                const currentCredentials = credentials.filter(item => {
                    return item.url === locationOrigin && !item.saved && !blackList.includes(item.url);
                });

                currentCredentials.length &&
                ReactDOM.render(<OfferPopUp credentials={currentCredentials}/>, document.getElementById('#offerPopup'));
            }
        });
    }
}

let contentScript = null;

getChromeStorageData().then(data => {
    console.log('storage', data);

    setChromeStorageData(!_.isEmpty(data) ? data : initialStorage).then(() => {
        contentScript = new ContentScript([].slice.call(loginForm));
        console.log('contentScript', contentScript);
    });
});


setTimeout(() => {
    const offerContainer = document.querySelector('#offerPopup');

    if (!offerContainer && contentScript !== null) {
        contentScript.createContainer();
        contentScript.showOfferPopup();
    }
}, 5000);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    request.updatedTab && console.log('Tab was Updated', request);
});
