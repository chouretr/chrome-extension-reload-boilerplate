// ON CONNECT
chrome.extension.onConnect.addListener(function (port) {
	port.onMessage.addListener(function (msg) {
        console.log(msg);
    });
});

// TO DETECT IF INSTALLED FROM EXTERNAL
chrome.runtime.onMessageExternal.addListener(
	(message, sender, sendResponse) => {
		// if (message === 'version') {
		// 	const manifest = chrome.runtime.getManifest();
		// 	sendResponse({
		// 		type: 'success',
		// 		version: manifest.version
		// 	});
		// 	return true;
		// }
		// return false;
	}
);

// ON INSTALL
chrome.runtime.onInstalled.addListener(function (details) {
    let version = details.reason + "==>" + details.previousVersion;
    console.log(version);
});