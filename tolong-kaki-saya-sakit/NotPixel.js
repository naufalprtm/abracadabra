const http = require('http');
const https = require('https');
const fs = require('fs');
const { format } = require('date-fns');
const { printBanner } = require('./banner/Solana0x-banner.js');
printBanner();
const url = "https://notpx.app/api/v1";
const WAIT = 180 * 3 * 1000; // in milliseconds
const DELAY = 1000; // in milliseconds
const WIDTH = 1000;
const HEIGHT = 1000;
const MAX_HEIGHT = 50;

const colors = {
    '#': "#000000",
    '.': "#3690EA",
    '*': "#ffffff"
};

const image = [
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#','#','#','#','#','#','#','#','#','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#','#','#','#','#','#','#','.','.','.','.','.','.','.','.','#','#','#','#','#','#','#',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ','#','#','#','#','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#','#','#','#','#','#',' ',' ',' ',' ',' ',' ',],
    [' ',' ',' ',' ',' ',' ',' ','#','#','#','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#','#','#','#',' ',' ',' ',' ',' ',],
    [' ',' ',' ',' ',' ',' ','#','#','#','.','.','.','.','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','.','.','.','.','#','#','#','#',' ',' ',' ',' ',],
    [' ',' ',' ',' ',' ','#','#','#','.','.','.','.','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','.','.','.','#','#','#','#',' ',' ',' ',],
    [' ',' ',' ',' ','#','#','#','.','.','.','.','.','*','*','*','.','.','.','.','*','*','*','*','.','.','.','*','*','*','*','.','.','.','.','#','#','#','#',' ',' ',],
    [' ',' ',' ',' ','#','#','#','.','.','.','.','.','.','*','*','*','.','.','.','*','*','*','*','.','.','.','*','*','*','.','.','.','.','.','.','#','#','#',' ',' ',],
    [' ',' ',' ',' ','#','#','#','.','.','.','.','.','.','.','*','*','*','.','.','*','*','*','*','.','.','*','*','*','.','.','.','.','.','.','.','#','#','#',' ',' ',],
    [' ',' ',' ',' ','#','#','#','.','.','.','.','.','.','.','.','*','*','*','.','*','*','*','*','.','*','*','*','.','.','.','.','.','.','.','.','#','#','#',' ',' ',],
    [' ',' ',' ',' ','#','#','#','.','.','.','.','.','.','.','.','.','*','*','*','*','*','*','*','*','*','*','.','.','.','.','.','.','.','.','.','#','#','#',' ',' ',],
    [' ',' ',' ',' ','#','#','#','#','.','.','.','.','.','.','.','.','.','*','*','*','*','*','*','*','*','.','.','.','.','.','.','.','.','.','#','#','#','#',' ',' ',],
    [' ',' ',' ',' ',' ','#','#','#','#','.','.','.','.','.','.','.','.','.','*','*','*','*','*','*','.','.','.','.','.','.','.','.','.','#','#','#','#',' ',' ',' ',],
    [' ',' ',' ',' ',' ',' ','#','#','#','.','.','.','.','.','.','.','.','.','.','*','*','*','*','.','.','.','.','.','.','.','.','.','#','#','#','#',' ',' ',' ',' ',],
    [' ',' ',' ',' ',' ',' ',' ','#','#','#','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#','#','#','#',' ',' ',' ',' ',' ',],
    [' ',' ',' ',' ',' ',' ',' ',' ','#','#','#','#','#','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#','#','#','#','#',' ',' ',' ',' ',' ',' ',' ',],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#','#','#','#','#','#','#','#','.','.','.','.','.','.','#','#','#','#','#','#','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#','#','#','#','#','#','#','#','#','#','#','#','#','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',]
];

// Function to log messages with timestamp
function logMessage(message, colorCode = '') {
    const currentTime = format(new Date(), '[HH:mm:ss]');
    console.log(`${currentTime} ${colorCode}${message}\x1b[0m`);
}

// Function to perform HTTP GET requests
function httpGet(url, headers) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, { headers }, (res) => {
            let data = '';

            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(data) }));
        }).on('error', (err) => reject(err));
    });
}

// Function to perform HTTP POST requests
function httpPost(url, data, headers) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        const req = client.request(url, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            }
        }, (res) => {
            let responseData = '';

            res.on('data', chunk => responseData += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(responseData) }));
        });

        req.on('error', (err) => reject(err));
        req.write(JSON.stringify(data));
        req.end();
    });
}

// Function to create a session and get an initial response
async function getSession(auth) {
    const headers = { authorization: auth };
    const response = await httpGet(`${url}/session`, headers);
    return response;
}

// Function to get the color of a pixel from the server
async function getColor(pixel, header) {
    try {
        const response = await httpGet(`${url}/image/get/${pixel}`, header);
        logMessage(`API Response (getColor): ${response.status} ${response.data}`, '\x1b[36m');

        if (response.status === 401) {
            return -1;
        }
        return response.data.pixel.color;
    } catch (error) {
        logMessage(`Request failed: ${error.message}`, '\x1b[31m');
        return "#000000";
    }
}

// Function to claim resources from the server
async function claim(header) {
    logMessage("Claiming resources", '\x1b[36m');
    try {
        const response = await httpGet(`${url}/mining/claim`, header);
        logMessage(`API Response (claim): ${response.status} ${response.data}`, '\x1b[36m');
    } catch (error) {
        logMessage(`Failed to claim resources: ${error.message}`, '\x1b[31m');
    }
}

// Function to calculate pixel index based on x, y position
function getPixel(x, y) {
    return y * 1000 + x + 1;
}

// Function to get x, y position from pixel index
function getPos(pixel, sizeX) {
    return [pixel % sizeX, Math.floor(pixel / sizeX)];
}

// Function to get pixel index based on canvas position
function getCanvasPos(x, y) {
    return getPixel(startX + x - 1, startY + y - 1);
}

// Starting coordinates
const minX = 500, maxX = 1000, minY = 300, maxY = 1000;
const startX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
const startY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
logMessage(`Starting coordinates: x=${startX}, y=${startY}`, '\x1b[32m');

// Function to perform the painting action
async function paint(canvasPos, color, header) {
    const data = {
        pixelId: canvasPos,
        newColor: color
    };

    try {
        const response = await httpPost(`${url}/repaint/start`, data, header);
        logMessage(`API Response (paint): ${response.status} ${response.data}`, '\x1b[36m');

        const [x, y] = getPos(canvasPos, 1000);

        if (response.status === 400) {
            logMessage("Out of energy", '\x1b[31m');
            return false;
        }
        if (response.status === 401) {
            return -1;
        }

        logMessage(`Paint: ${x},${y}`, '\x1b[32m');
        return true;
    } catch (error) {
        logMessage(`Failed to paint: ${error.message}`, '\x1b[31m');
        return false;
    }
}

// Function to extract the username from the URL-encoded init data
function extractUsernameFromInitData(initData) {
    const decodedData = decodeURIComponent(initData);
    const usernameMatch = decodedData.match(/"username":"([^"]+)"/);
    return usernameMatch ? usernameMatch[1] : "Unknown";
}

// Function to load accounts from data.txt
function loadAccountsFromFile(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split('\n').filter(line => line.trim()).map(line => `initData ${line.trim()}`);
}

// Function to fetch mining data (balance and other stats)
async function fetchMiningData(header) {
    try {
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait before making request
        const response = await httpGet(`${url}/mining/status`, header);
        logMessage(`API Response (fetchMiningData): ${response.status} ${response.data}`, '\x1b[36m');

        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait after receiving response

        if (response.status === 200) {
            const userBalance = response.data.userBalance || 'Unknown';
            logMessage(`Balance: ${userBalance}`, '\x1b[35m');
        } else {
            logMessage(`Failed to fetch mining data: ${response.status}`, '\x1b[31m');
        }
    } catch (error) {
        logMessage(`Error fetching mining data: ${error.message}`, '\x1b[31m');
    }
}

// Main function to perform the painting process
async function main(auth, account) {
    const headers = { authorization: auth };

    try {
        await fetchMiningData(headers);
        await claim(headers);

        const size = image.length * image[0].length;
        const order = Array.from({ length: size }, (_, i) => i);
        order.sort(() => Math.random() - 0.5); // Shuffle the order

        for (const posImage of order) {
            const [x, y] = getPos(posImage, image[0].length);
            await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 3000)); // Random delay

            try {
                const color = await getColor(getCanvasPos(x, y), headers);
                if (color === -1) {
                    logMessage("DEAD :(", '\x1b[31m');
                    console.log(headers.authorization);
                    break;
                }

                if (image[y][x] === ' ' || color === colors[image[y][x]]) {
                    logMessage(`Skip: ${startX + x - 1},${startY + y - 1}`, '\x1b[31m');
                    continue;
                }

                const result = await paint(getCanvasPos(x, y), colors[image[y][x]], headers);
                if (result === -1) {
                    logMessage("DEAD :(", '\x1b[31m');
                    console.log(headers.authorization);
                    break;
                } else if (!result) {
                    break;
                }

            } catch (error) {
                logMessage(`IndexError at posImage: ${posImage}, y: ${y}, x: ${x}`, '\x1b[31m');
            }
        }

    } catch (error) {
        logMessage(`Network error in account ${account}: ${error.message}`, '\x1b[31m');
    }
}

// Main processing function for multiple accounts
async function processAccounts(accounts) {
    const totalAccounts = accounts.length;
    const firstAccountStartTime = new Date();
    const batchSize = 4; // Set your desired batch size here

    for (let i = 0; i < totalAccounts; i += batchSize) {
        const batch = accounts.slice(i, i + batchSize);
        const promises = batch.map(async (account) => {
            const { auth } = { auth: account }; // Example: replace with your actual extraction logic
            const username = extractUsernameFromInitData(account);
            logMessage(`Processing account: ${username}`, '\x1b[34m');
            return main(auth, username);
        });

        await Promise.all(promises);
        logMessage(`--- BATCH ${Math.floor(i / batchSize) + 1} COMPLETE ---`, '\x1b[34m');
        const currentTime = new Date();
        const elapsedTime = currentTime - firstAccountStartTime;

        logMessage(`Elapsed time for ${batch.length} accounts: ${(elapsedTime / 10000).toFixed(2)} seconds`, '\x1b[32m');

        if (i + batchSize < totalAccounts) {
            await new Promise(resolve => setTimeout(resolve, WAIT));
        }
    }
}

// Load accounts from file and start processing
const accounts = loadAccountsFromFile('./data/notpixel.txt');
processAccounts(accounts);
