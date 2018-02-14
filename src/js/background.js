/* global  chrome, console*/

chrome.browserAction.onClicked.addListener(tab => {
    chrome.tabs.create({ 'url': chrome.extension.getURL('/src/popup.html') }, tab => {

    });
});


// chrome.tabs.onCreated.addListener(() => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.tabs.sendMessage(tabs[0].id, { created: true }, (response) => {
//             console.log(response.farewell);
//         });
//     });
// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, Tab) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { updatedTab: { tabId, changeInfo, Tab } });
    });
});