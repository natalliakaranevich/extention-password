/* global window, document, setTimeout, console */

import $ from 'jquery';
import _ from 'lodash';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';

import { setChromeStorageData, getChromeStorageData, clearSrotage } from './helpers';
import { storageCredentialsKey, storageBlackListKey, storageFrozenListKey } from './constants';

import OfferPopUp from './components/offerPopupHtml.jsx'; // eslint-disable-line no-unused-vars
import '../styles/offerPopup.scss';

const locationOrigin = window.location.origin;
const initialStorage = {
    [storageCredentialsKey]: [],
    [storageBlackListKey]: [],
    [storageFrozenListKey]: []
};
const loginForm = document.querySelectorAll('form.login_form');
// clearSrotage();
class ContentScript {
    constructor(form) {
        this.forms = form;

        this.createContainer();
        this.showOfferPopup({});
        this.handleSubmit();
    }

    createContainer() {
        $('body').append('<div id="#offerPopup" class="offer-popup-container" />');
    }

    handleSubmit() {
        this.forms.length && this.forms.map(form => {

            $(form).on('submit', e => {
                e.preventDefault();
                const thisForm = $(e.target);
                const email = thisForm.find('[name="email"]');
                const password = thisForm.find('[type="password"]');

                if (email && password) {
                    const newCredentials = {
                        password: password.val(),
                        email: email.val(),
                        url: locationOrigin,
                        saved: false
                    };

                    getChromeStorageData([storageCredentialsKey, storageFrozenListKey]).then(data => {
                        const shouldAdd = data[storageCredentialsKey].find(item => {
                            return item.password === newCredentials.password && item.email === newCredentials.email &&
                                    item.url === newCredentials.url;
                        });
                        const newFrozen = data[storageFrozenListKey].filter(item => {
                            return item !== newCredentials.url;
                        });

                        if (!shouldAdd) {
                            data[storageCredentialsKey].push(newCredentials);
                        }

                        setChromeStorageData({
                            [storageCredentialsKey]: data[storageCredentialsKey],
                            [storageFrozenListKey]: newFrozen
                        });
                    });
                }
            });
        });
    }

    showOfferPopup() {
        getChromeStorageData().then(data => {
            const {
                [storageCredentialsKey]: credentials,
                [storageBlackListKey]: blackList,
                [storageFrozenListKey]: frozenList
            } = data;
            const validData = credentials && credentials.length;

            if (validData) {
                const currentCredentials = credentials.filter(item => {
                    return item.url === locationOrigin && !item.saved && !blackList.includes(item.url) &&
                            !frozenList.includes(item.url);
                });

                currentCredentials.length &&
                ReactDOM.render(<OfferPopUp credentials={currentCredentials} />, document.getElementById('#offerPopup'));
            }
        });
    }
}
let contentScript = null;
let showPopupHere = false;

getChromeStorageData().then(data => {
    const dataExist = !_.isEmpty(data);
    console.log('storage', data);
    showPopupHere = dataExist && data[storageFrozenListKey] && !data[storageFrozenListKey].includes(locationOrigin);

    setChromeStorageData(dataExist ? data : initialStorage).then(() => {
        contentScript = new ContentScript([].slice.call(loginForm));
        console.log(contentScript);
    });
});


setTimeout(() => {
    const offerContainer = document.querySelector('#offerPopup');

    if (!offerContainer && contentScript !== null) {
        contentScript.createContainer();
        showPopupHere && contentScript.showOfferPopup();
    }
}, 5000);
