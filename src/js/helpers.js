/* global Promise, chrome */
const chromeStorage = chrome.storage.local;

export const setChromeStorageData = data => {
    return new Promise(resolve => {
        chromeStorage.set(data, () => {
            resolve(data);
        });
    });
};

export const getChromeStorageData = (key) => {
    return new Promise(resolve => {
        chromeStorage.get(key, (result) => {
            resolve(result);
        });
    });
};

export const clearSrotage = callback => {
    chrome.storage.local.clear(() => {
        if (callback) {
            return callback(chrome.runtime.lastError);
        }
    });
};

export const convertPassword = password => {
    return password.split('').map(() => '*');
};
