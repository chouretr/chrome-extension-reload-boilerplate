
// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function (tab) {
	// Send a message to the active tab
	chrome.tabs.query({ active: true, currentWindow: true },
		function (tabs) {
			var activeTab = tabs[0];
			chrome.tabs.sendMessage(activeTab.id,
				{ "message": "clicked_browser_action" }
			);
		});
});

// TO DETECT IF INSTALLED FROM EXTERNAL
chrome.runtime.onMessageExternal.addListener(
	(message, sender, sendResponse) => {}
);

// ON INSTALL
chrome.runtime.onInstalled.addListener(function (details) {
	let version = details.reason + "==>" + details.previousVersion;
	console.log(version);
});