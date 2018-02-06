import $ from 'jquery';
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

import { setChromeStorageData, getChromeStorageData, clearSrotage } from './helpers';
import { storageCredentialsKey } from './constants';

import OfferPopUp from './components/offerPopupHtml.jsx';

const locationOrigion = window.location.origin;

class Twitter {
    constructor(form) {
        this.forms = form;

        clearSrotage();
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
                        url: locationOrigion,
                        saved: false
                    };
                    getChromeStorageData(storageCredentialsKey).then(data => {
                        !data.credentials ? data.credentials = [] : '';
                        data.credentials.push(newCredentials);
                        setChromeStorageData(storageCredentialsKey, data.credentials)
                    })
                }
            });
        })
    }

    showOfferPopup() {
        getChromeStorageData(storageCredentialsKey).then(data => {
            const { credentials } = data;
            const validData = credentials && credentials.length;
            if (validData) {
                const currentCredentials = credentials.filter(item => item.url === locationOrigion && !item.saved);
                debugger;
                currentCredentials.length && ReactDOM.render(<OfferPopUp />, document.getElementById('#offerPopup'));
            }
        });
    }
}

const twitter = new Twitter([].slice.call(document.querySelectorAll('form.login_form')));
console.log(twitter);

setTimeout(() => {
    twitter.createContainer();
    twitter.showOfferPopup()
}, '5000');