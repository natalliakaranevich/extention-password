const chromeStorage = chrome.storage.local;

export function setChromeStorageData (data) {
  return new Promise((resolve) => {
    chromeStorage.set(data, () => {
      resolve(data);
    });
  });
}

export function getChromeStorageData (key) {
  return new Promise((resolve) => {
    chromeStorage.get(key, (result) => {
      resolve(result);
    });
  });
}

export function clearSrotage(callback) {
  chrome.storage.local.clear(function() {
   if (callback) return callback(chrome.runtime.lastError)
  });
}