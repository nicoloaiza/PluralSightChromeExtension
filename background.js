
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse){
		console.log(request);
        if(request.msg == "downloadJSON") {
			chrome.tabs.executeScript({
				file: 'jquery-3.1.0.min.js'
			});
			chrome.tabs.executeScript({
				file: 'DownloadJSON.js'
			});
		};
        if(request.msg == "downloadVideos") {
			chrome.tabs.executeScript({
				file: 'jquery-3.1.0.min.js'
			});
			chrome.tabs.executeScript({
				file: 'DownloadVideos.js'
			});
		};
    }
);