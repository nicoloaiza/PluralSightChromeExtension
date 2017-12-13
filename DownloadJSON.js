
jQuery.noConflict();
(function(console){

console.save = function(data, filename){
    if(!data) {
        console.error('Console.save: No data')
        return;
    }
    if(!filename) filename = 'console.json'
    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }
    var blob = new Blob([data], {type: 'text/json'}),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a')
    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
 }

})(console);


function getFileName(fileSrc)
{
    var filename = fileSrc.substring(fileSrc.lastIndexOf('/')+1);
    if(filename.indexOf('?') > -1)
        filename = filename.substring(0,filename.lastIndexOf('?'));
    return filename;
}


function dlVid()
{
  var lastVideoName = jQuery(".module").last().find("li").last().find("h3").text().trim();
  console.log(lastVideoName);
  var courseTitle = jQuery(".title-course").first().find("a").first().text().trim().replace(/[^a-zA-Z0-9]/g, "_");
  var modules = jQuery(".module");
  var counter = 0;
  var titlesArray = [];
  modules.each(function(indexModules){
  	var module = modules[indexModules];
    var currMod = jQuery(module).find("h2").text().trim();
    var moduleTime = jQuery(module).find(".side-menu-module-duration").text();
    var videos = jQuery(module).find("li");
    videos.each(function(indexVideos){
  		var video = videos[indexVideos];
    	var currTitle = jQuery(video).find("h3").text().trim();
    	var videoTime = jQuery(video).find(".side-menu-clip-duration").text();
    	titlesArray.push({
        "Order" : counter,
        "Module" : indexModules + ". " + currMod,
        "Title" : indexVideos + ". " + currTitle,
        "FileName" : currTitle,
        "ModuleDuration" : moduleTime,
        "videoDuration" : videoTime
      });
      counter++;
    });
  });
  console.save(JSON.stringify(titlesArray), courseTitle+".json");
}

dlVid();