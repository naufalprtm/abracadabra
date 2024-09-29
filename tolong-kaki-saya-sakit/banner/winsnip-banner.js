// banner/banner.js
const colors = require("colors");

function printBanner() {
    console.log(colors.blue('██     ██ ██ ███    ██ ███████ ███    ██ ██ ██████  '));
    console.log(colors.blue('██     ██ ██ ████   ██ ██      ████   ██ ██ ██   ██ '));
    console.log(colors.blue('██  █  ██ ██ ██ ██  ██ ███████ ██ ██  ██ ██ ██████  '));
    console.log(colors.blue('██ ███ ██ ██ ██  ██ ██      ██ ██  ██ ██ ██ ██      '));
    console.log(colors.blue(' ███ ███  ██ ██   ████ ███████ ██   ████ ██ ██      '));
    console.log();
    console.log("Join our Telegram channel: https://t.me/winsnip");
}

module.exports = { printBanner };
