/*global userName*/
/*eslint no-undef: "error"*/

const bot = require("../index.js").bot;
const config = require("../modules/config.js").config;
const stream = require("../modules/ffmpeg.js").stream;

/**
 * Function to play media
 */
function play() {
  bot.onText(/^\/play (.+)/, (msg, match) => {
    const userID = msg.from.id;
    try {
      userName = `${msg.from.first_name} ${msg.from.last_name}`;
    } catch (err) {
      userName = msg.from.first_name;
    }
    const chatId = msg.chat.id;
    const messageID = msg.message_id;
    const inputFile = match[1];
    const streamServer = config.streamServer;
    const fileExtension = inputFile
      .substring(inputFile.lastIndexOf(".") + 1)
      .toLowerCase();
    if (["mp4", "mkv", "avi", "flv", "wmv"].includes(fileExtension)) {
      const mediaType = "video";
      stream(inputFile, streamServer, mediaType);
      bot.sendMessage(
        chatId,
        `*Already streaming*\n\nFile: \`${inputFile}\`\nType: \`${mediaType}\``,
        {
          parse_mode: "MarkdownV2",
          disable_web_page_preview: true,
          reply_to_message_id: messageID,
        }
      );
      console.table(
        `${userName}[${userID}] added ${inputFile} (video) to playlist`
      );
    } else if (["mp3", "flac", "wav"].includes(fileExtension)) {
      const mediaType = "audio";
      stream(inputFile, streamServer, mediaType);
      bot.sendMessage(
        chatId,
        `*Already streaming*\n\nFile: \`${inputFile}\`\nType: \`${mediaType}\``,
        {
          parse_mode: "MarkdownV2",
          disable_web_page_preview: true,
          reply_to_message_id: messageID,
        }
      );
      console.table(
        `${userName}[${userID}] added ${inputFile} (audio) to playlist`
      );
    } else {
      bot.sendMessage(chatId, `Unsupported file format`, {
        parse_mode: "MarkdownV2",
        disable_web_page_preview: true,
        reply_to_message_id: messageID,
      });
    }
  });
}

module.exports = { play };
