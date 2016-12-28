    
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({
		file: 'jquery-3.1.0.min.js'
	});
	chrome.tabs.executeScript({
		file: 'Download.js'
	});   
});


