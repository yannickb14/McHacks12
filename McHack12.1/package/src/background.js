// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updatePopup") {
        // Store the data for the popup to access
        chrome.storage.local.set({ popupData: request.data }, () => {
            console.log("Popup data updated");
        });
        sendResponse({ success: true });
    }
});
