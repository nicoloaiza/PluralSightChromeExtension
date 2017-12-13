
function downloadVideos() {
    chrome.extension.sendMessage({ msg: "downloadVideos" });
}

function downloadJSON() {
    chrome.extension.sendMessage({ msg: "downloadJSON" });
}

window.onload = function() {
    document.getElementById('downloadVideos').addEventListener('click', downloadVideos);
    document.getElementById('downloadJSON').addEventListener('click', downloadJSON);
}  