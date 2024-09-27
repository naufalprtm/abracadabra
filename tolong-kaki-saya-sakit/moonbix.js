const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
const { format } = require('date-fns');
const { URL } = require('url');

function isUrlEncoded(url) {
    const decodedUrl = decodeURIComponent(url);
    const reencodedUrl = encodeURIComponent(decodedUrl);
    return reencodedUrl === url;
}

function urlDecode(encodedUrl) {
    return decodeURIComponent(encodedUrl);
}

function log(message, level = "INFO") {
    const levels = {
        "INFO": chalk.cyan,
        "ERROR": chalk.red,
        "SUCCESS": chalk.green,
        "WARNING": chalk.yellow
    };
    const currentTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    console.log(`${chalk.white(currentTime)} | ${levels[level](level)} | ${message}`);
}

class MoonBix {
    constructor(token, proxy = null) {
        this.session = axios.create({
            baseURL: 'https://www.binance.info',
            headers: {
                'authority': 'www.binance.info',
                'accept': '*/*',
                'accept-language': 'en-EG,en;q=0.9,ar-EG;q=0.8,ar;q=0.7,en-GB;q=0.6,en-US;q=0.5',
                'clienttype': 'web',
                'content-type': 'application/json',
                'lang': 'en',
                'origin': 'https://www.binance.info',
                'referer': 'https://www.binance.info/en/game/tg/moon-bix',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            }
        });

        if (proxy) {
            this.session.defaults.proxy = {
                host: proxy.split(':')[0],
                port: proxy.split(':')[1]
            };
        }

        this.token = token;
        this.gameResponse = null;
        this.task = null;
    }

    async login() {
        try {
            const response = await this.session.post('/bapi/growth/v1/friendly/growth-paas/third-party/access/accessToken', {
                queryString: this.token,
                socialType: 'telegram',
            });
            if (response.status === 200) {
                this.session.defaults.headers['x-growth-token'] = response.data.data.accessToken;
                log("Logged in successfully!", "SUCCESS");
                return true;
            } else {
                log("Failed to login", "ERROR");
                return false;
            }
        } catch (e) {
            log(`Error during login: ${e.message}`, "ERROR");
        }
    }

    async userInfo() {
        try {
            const response = await this.session.post('/bapi/growth/v1/friendly/growth-paas/mini-app-activity/third-party/user/user-info', {
                resourceId: 2056,
            });
            return response.data;
        } catch (e) {
            log(`Error during get info: ${e.message}`, "ERROR");
        }
    }

    async gameData() {
        try {
            while (true) {
                const response = await axios.post('https://app.winsnip.xyz/play', this.gameResponse);
                if (response.data.message === 'success' && response.data.game.log >= 100) {
                    this.game = response.data.game;
                    return true;
                }
            }
        } catch (e) {
            log(`Error getting game data: ${e.message}`, "ERROR");
        }
    }

    async solveTask() {
        try {
            const res = await this.session.post('/bapi/growth/v1/friendly/growth-paas/mini-app-activity/third-party/task/list', {
                resourceId: 2056
            });

            if (!res || !res.data) {
                log("Failed to fetch tasks!", "ERROR");
                return;
            }

            const tasksData = res.data.data.data[0].taskList.data;
            const resourceIds = tasksData.filter(entry => entry.status !== 'COMPLETED' && entry.type !== 'THIRD_PARTY_BIND').map(entry => entry.resourceId);

            for (const resourceId of resourceIds) {
                const ress = await this.session.post('/bapi/growth/v1/friendly/growth-paas/mini-app-activity/third-party/task/complete', {
                    resourceIdList: [resourceId],
                    referralCode: null
                });
                if (ress.data.code === "000000") {
                    log(`Success complete task id ${resourceId}`, "SUCCESS");
                } else {
                    log(`Failed complete task id ${resourceId}`, "ERROR");
                }
            }
            return true;
        } catch (e) {
            log(`Error completing tasks: ${e.message}`, "ERROR");
        }
    }

    async completeGame() {
        try {
            const response = await this.session.post('/bapi/growth/v1/friendly/growth-paas/mini-app-activity/third-party/game/complete', {
                resourceId: 2056,
                payload: this.game.payload,
                log: this.game.log,
            });
            if (response.data.success) {
                log(`Game completed! Earned + ${this.game.log}`, "SUCCESS");
            }
            return response.data.success;
        } catch (e) {
            log(`Error during complete game: ${e.message}`, "ERROR");
        }
    }

    async startGame() {
        try {
            while (true) {
                const response = await this.session.post('/bapi/growth/v1/friendly/growth-paas/mini-app-activity/third-party/game/start', {
                    resourceId: 2056,
                });
                this.gameResponse = response.data;

                if (this.gameResponse.code === '000000') {
                    log("Game started successfully!", "INFO");
                    return true;
                } else if (this.gameResponse.code === '116002') {
                    log('Attempts not enough! Switching to the next account.', "WARNING");
                    return false;
                }
                log("ERROR! Cannot start game.", "ERROR");
                return false;
            }
        } catch (e) {
            log(`Error during start game: ${e.message}`, "ERROR");
        }
    }

    async start() {
        if (!await this.login()) {
            log("Login failed.", "ERROR");
            return;
        }
        if (!await this.userInfo()) {
            log("Failed to get user data.", "ERROR");
            return;
        }
        if (!await this.solveTask()) {
            log("Failed to solve task.", "ERROR");
            return;
        }
        while (await this.startGame()) {
            if (!await this.gameData()) {
                log("Failed to generate game data!", "ERROR");
                return;
            }
            await sleep(45000);
            if (!await this.completeGame()) {
                log("Failed to complete game", "ERROR");
            }
            await sleep(15000);
        }
    }
}

// Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to run account
async function runAccount(index, token, proxy = null) {
    const tokens = isUrlEncoded(token) ? urlDecode(token) : token;
    log(`=== Account ${index} ===`, "INFO");
    const moonBix = new MoonBix(tokens, proxy);
    await moonBix.start();
    log(`=== Account ${index} Done ===`, "SUCCESS");
    await sleep(10000);
}

// Main execution function
(async function main() {
    console.clear();
    const proxies = fs.readFileSync('./proxy.txt', 'utf-8').split('\n').map(line => line.trim()).filter(Boolean);
    const tokens = fs.readFileSync('./data/Binance_Moonbix_bot.txt', 'utf-8').split('\n').map(line => line.trim()).filter(Boolean);

    log("==== Starting ===", "INFO");
    while (true) {
        const threads = [];
        for (let index = 0; index < tokens.length; index++) {
            const token = tokens[index];
            const proxy = proxies.length ? proxies[index % proxies.length] : null;
            threads.push(runAccount(index + 1, token, proxy));
        }
        await Promise.all(threads);
        log("All accounts have been completed.", "SUCCESS");
        await sleep(2000); // Adjust sleep time as necessary
    }
})();
