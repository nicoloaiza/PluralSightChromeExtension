
jQuery.noConflict();
var counter = 1;
var courseTitle = jQuery(".title-course").first().find("a").first().text().trim().replace(/[^a-zA-Z0-9]/g, "_");
var lastVideoName = jQuery(".module").last().find("li").last().find("h3").text().trim();
var lastVideoDuration = jQuery(".module").last().find("li").last().find(".side-menu-clip-duration").text().trim();
var lastModule = jQuery(".module").last().find("h2").text().trim();
var previousModule = '';
var lastVidToDl = false;
var moduleCounter = 0;
var videoCounter = 1;
var nextVid = "";
var nextTitle = "";
var nextDuration = "";
var nextModule = "";
var dlSpeed = 150;
var minuteSizeInMB = 3;
var titlesArray = [];

(function (console) {
  console.save = function (data, filename) {
    if (!data) {
      console.error('Console.save: No data')
      return;
    }

    if (!filename) filename = 'console.json'

    if (typeof data === "object") {
      data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], { type: 'text/json' }),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a')
    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
  }
})(console);

function SaveFile(blob, fileName) {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}

function getFileName(fileSrc) {
  var filename = fileSrc.substring(fileSrc.lastIndexOf('/') + 1);
  if (filename.indexOf('?') > -1)
    filename = filename.substring(0, filename.lastIndexOf('?'));
  return filename;
}

function getNameForFile(value){
  return value.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

function downloadFile(url, fileName){
  var x=new XMLHttpRequest();
	x.open("GET", url, true);
	x.responseType = 'blob';
	x.onload=function(e){
    SaveFile(e.target.response, fileName);
  }
	x.send();  
}

function dlVid() {
  var filePath = jQuery("video").attr("src");
  var currTitle = jQuery("ul.clips > li.selected").find("h3").text().trim();
  var currMod = jQuery("ul.clips > li.selected").parent().parent().find("h2").text().trim();
  console.log(currMod);
  // var time = jQuery("span.total-time").text();
  var minutes = parseInt(jQuery("span.total-time").text().trim().split(":")[0]) + 1;
  var size = minutes * minuteSizeInMB * 1024 * 1024;
  var timeNeeded = Math.ceil((size / (dlSpeed * 1024)) * 500);
  var moduleTime = jQuery("header.active").find(".side-menu-module-duration").text();
  var videoTime = jQuery("ul.clips > li.selected").find(".side-menu-clip-duration").text();
  
  if(currMod === lastModule){
    lastVideoName = jQuery(".module").last().find("li").last().find("h3").text().trim();
    if(currTitle === lastVideoName){
      console.save(JSON.stringify(titlesArray), courseTitle + ".json");
      lastVidToDl = true;
    }
  }  

  if(!lastVidToDl){
    if (previousModule != currMod) {
      previousModule = currMod;
      moduleCounter++;
      videoCounter = 1;
    }

    var currentVideo = {
      "Order": counter,
      "Module": moduleCounter + ". " + currMod,
      "Title": videoCounter + ". " + currTitle,
      "FileName": getNameForFile(moduleCounter + '_' + currMod + '_' + videoCounter + '_' + currTitle) + '.mp4',
      "ModuleDuration" : moduleTime,
      "videoDuration" : videoTime,
      "Size": size
    };
    downloadFile(filePath, currentVideo.FileName);
    titlesArray.push(currentVideo);
    videoCounter++;
    counter = counter + 1;

    jQuery("#next-control").click();

    setTimeout(function () { jQuery("#play-control").click(); }, 5000);

    setTimeout(dlVid, timeNeeded);
    nextVid = jQuery("ul.clips > li.selected").next();
    nextTitle = nextVid.find("h3").text().trim();
    nextDuration = nextVid.find(".side-menu-clip-duration").text().trim();
    nextModule = nextVid.parent().parent().find("h2").text().trim();
  }
}

$("header").trigger('click');
dlVid();