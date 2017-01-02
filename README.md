# PluralSightChromeExtension
Chrome Extension for download videos from pluralsight to watch offline

Just install the extension in chrome browser, open the course you want to download and download it from the extension icon, don't close the tab, the extension iterates through each video

After download all the videos, create a new folder and put all the videos on it (including the file with .json extension and the file process.rb, you need to have ruby installed), open the console and go to that folder and execute "ruby process.rb", this will create forlders for each module and will put each video in his correspondent folder renaming the video.
