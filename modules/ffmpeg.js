const { exec } = require("child_process");

/**
 * Function to stream media with ffmpeg
 * @param sourceFile The media file, it can be a file path or a URL
 * @param streamServer The streaming server address
 * @param mediaType The type of media
 */
function stream(sourceFile, streamServer, mediaType) {
  if (mediaType === "video") {
    exec(`ffmpeg -re -i ${sourceFile} -c:v libx264 -b:v 1m -c:a aac -b:a 320k -f flv ${streamServer}`);
  } else if (mediaType === "audio") {
    exec(`ffmpeg -f lavfi -re -i color=s=1920x1080:r=25:c='#FFFFFF':d=5 -f flac -re -i ${sourceFile} -c:v libx264 -b:v 320k -c:a aac -b:a 320k -f flv ${streamServer}`);
  }
}

module.exports = { stream };
