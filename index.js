const telegramBot = require("node-telegram-bot-api");
const config = require("./modules/config.js").config;

const bot = new telegramBot(config.botToken, { polling: true });
module.exports = { bot };

const play = require("./plugins/play.js").play;
play();
