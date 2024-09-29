const { Api, TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const fs = require('fs');
const figlet = require('figlet'); 
const path = require('path');
const readline = require('readline');
const chalk = require('chalk'); 
const intro = 'Telegram Query ID Bot';
const express = require('express');
const request = require('request');
const { printBanner } = require('./tolong-kaki-saya-sakit/banner/Solana0x-banner');

require('dotenv').config();

const app = express();

const apiId = parseInt(process.env.API_ID, 10);
const apiHash = process.env.API_HASH;
console.log('API ID:', apiId);
console.log('API Hash:', apiHash);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to ask a question using readline
function askQuestion(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

const accounts = new Map();
// Function to read lines from a file
function readLinesFromFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return [];
    }
    return fs.readFileSync(filePath, 'utf8').split('\n').map(line => line.trim()).filter(line => line);
}

// Function to login using a phone number
async function loginWithPhoneNumber() {
    const phoneNumber = await askQuestion("Please enter your phone number (e.g., +1234567890): ");
    const stringSession = new StringSession('');
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });

    await client.start({
        phoneNumber: async () => phoneNumber,
        phoneCode: async () => await askQuestion("Please enter the code you received: "),
        password: async () => await askQuestion("Please enter your password (if required): "),
        onError: (error) => console.error("Error:", error),
    });

    console.log('Logged in successfully');

    const sessionString = client.session.save();
    const sessionFolder = 'sessions';
    const sanitizedPhone = phoneNumber.replace(/\D/g, '');
    const sessionFile = path.join(sessionFolder, `${sanitizedPhone}.session`);

    if (!fs.existsSync(sessionFolder)) {
        fs.mkdirSync(sessionFolder, { recursive: true });
    }

    fs.writeFileSync(sessionFile, sessionString, 'utf8');
    console.log(`Session saved to ${sessionFile}`);
    accounts.set(phoneNumber, client);
}

// Function to login using a session file
async function loginWithSessionFile() {
    const sessionFolder = 'sessions';

    if (!fs.existsSync(sessionFolder) || fs.readdirSync(sessionFolder).length === 0) {
        console.log('No session files found.');
        return;
    }

    const sessionFiles = fs.readdirSync(sessionFolder).filter(file => file.endsWith('.session'));

    if (sessionFiles.length === 0) {
        console.log('No session files available.');
        return;
    }

    console.log('Select a session file to login with:');
    sessionFiles.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
    });

    const selectedFileIndex = parseInt(await askQuestion("Enter the session file number (or 0 for all): "), 10);

    // Add a delay of 5 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));

    if (selectedFileIndex === 0) {
        for (const file of sessionFiles) {
            const sessionData = fs.readFileSync(path.join(sessionFolder, file), 'utf8');

            // Check if the sessionData is a valid string
            if (!sessionData || sessionData.trim() === '') {
                console.log(`Session file ${file} is empty or invalid.`);
                continue;
            }

            try {
                const client = new TelegramClient(new StringSession(sessionData), apiId, apiHash, { connectionRetries: 5 });
                await client.start();
                const phone = file.replace('.session', '');
                console.log(`Logged in using session file: ${file}`);
                accounts.set(phone, client);
            } catch (error) {
                console.error(`Failed to login using session file ${file}:`, error.message);
            }
        }
    } else {
        const selectedFile = sessionFiles[selectedFileIndex - 1];
        const sessionData = fs.readFileSync(path.join(sessionFolder, selectedFile), 'utf8');

        // Check if the sessionData is a valid string
        if (!sessionData || sessionData.trim() === '') {
            console.log(`Session file ${selectedFile} is empty or invalid.`);
            return;
        }

        try {
            const client = new TelegramClient(new StringSession(sessionData), apiId, apiHash, { connectionRetries: 5 });
            await client.start();
            const phone = selectedFile.replace('.session', '');
            console.log(`Logged in using session file: ${selectedFile}`);
            accounts.set(phone, client);
        } catch (error) {
            console.error(`Failed to login using session file ${selectedFile}:`, error.message);
        }
    }
}

// Function to request WebView for a client
async function requestWebViewForClient(client, phoneNumber, botPeer, url) {
    try {
        console.log(`Requesting WebView for Bot: ${botPeer} with URL: ${url}`);
        
        const result = await client.invoke(
            new Api.messages.RequestWebView({
                peer: botPeer,
                bot: botPeer,
                fromBotMenu: false,
                url: url,
                platform: 'android',
            })
        );
        console.log('Received result:', result);

        const webAppData = decodeURIComponent(result.url.split('#')[1].split('&')[0].split('=')[1]);
        console.log('Parsed webAppData:', webAppData);

        return `${webAppData}`;

    } catch (error) {
        console.error("Error requesting WebView:", error);
        if (error.code === 400 && error.errorMessage === 'URL_INVALID') {
            console.log(`Retrying request for Bot: ${botPeer} with URL: ${url} without X-Frame...`);
            try {
                const result = await client.invoke(
                    new Api.messages.RequestWebView({
                        peer: botPeer,
                        bot: botPeer,
                        fromBotMenu: false,
                        url: url,
                        platform: 'android',
                        ignoreXFrameHeader: true
                    })
                );

                console.log('Received result on retry:', result);
                const webAppData = decodeURIComponent(result.url.split('#')[1].split('&')[0].split('=')[1]);
                console.log('Parsed webAppData on retry:', webAppData);

                return `${webAppData}`;
            } catch (retryError) {
                console.error("Retry failed:", retryError);
                throw retryError;
            }
        } else {
            throw error;
        }
    }
}

// Function to request WebView for all clients with multiple bots and URLs
async function requestWebViewForAllClients() {
    if (accounts.size === 0) {
        console.log('No accounts are logged in.');
        return;
    }

    const botListFile = 'bot_list.txt'; // File containing bot peers
    const urlListFile = 'url.txt';       // File containing URLs

    const botPeers = readLinesFromFile(botListFile);
    const urls = readLinesFromFile(urlListFile);

    // Validate that there are bots and URLs
    if (botPeers.length === 0 || urls.length === 0) {
        console.log('No bot peers or URLs found.');
        return;
    }

    // Ensure both lists are of the same length
    if (botPeers.length !== urls.length) {
        console.error('Error: The number of bots and URLs must match.');
        return;
    }

    // Create data folder if it doesn't exist
    const dataFolder = 'data';
    if (!fs.existsSync(dataFolder)) {
        fs.mkdirSync(dataFolder, { recursive: true });
    }

    // Loop through each bot peer
    for (let i = 0; i < botPeers.length; i++) {
        const botPeer = botPeers[i];
        const url = urls[i];
        const resultsForBot = []; // Array to hold results for the current bot

        // Loop through each account
        for (const [phoneNumber, client] of accounts.entries()) {
            console.log(`Processing account: ${phoneNumber}`);
            console.log(`Processing Bot: ${botPeer} with URL: ${url}`);

            try {
                const webAppData = await requestWebViewForClient(client, phoneNumber, botPeer, url);
                
                // Check if the webAppData was retrieved successfully
                if (webAppData) {
                    resultsForBot.push(webAppData); // Collect data for this bot
                }
            } catch (error) {
                console.error(`Failed to process Bot: ${botPeer} with URL: ${url}`, error);
            }
        }

        // Only write results if there are any for the current bot
        if (resultsForBot.length > 0) {
            const sanitizedBotPeer = botPeer.replace('@', ''); // Remove '@' for filename
            const resultFile = path.join(dataFolder, `${sanitizedBotPeer}.txt`);
            fs.writeFileSync(resultFile, `${resultsForBot.join('\n')}\n`, 'utf8'); // Write results to a bot-specific file
            console.log(`Results saved to ${resultFile}`);
        }
    }

    console.log('All WebAppData has been saved in their respective files.');
}


// Function to logout a client
async function logoutClient(client) {
    try {
        await client.logOut();
        console.log('Logged out successfully.');
    } catch (error) {
        console.error("Error logging out:", error);
    }
}

// Function to get refresh query ID from the selected bot
async function getRefreshQueryId() {
    const botListFile = 'bot_list.txt';
    const urlListFile = 'url.txt';
    
    const botPeers = readLinesFromFile(botListFile);
    const urls = readLinesFromFile(urlListFile);

    // Validasi bahwa ada bot dan URL
    if (botPeers.length === 0) {
        console.log('No bot peers found in bot_list.txt');
        return;
    }

    if (urls.length === 0) {
        console.log('No URLs found in url.txt');
        return;
    }

    if (botPeers.length !== urls.length) {
        console.error('Error: The number of bots and URLs must match.');
        return;
    }

    console.log('Select a bot from the following list:');
    botPeers.forEach((botPeer, index) => {
        console.log(`${index + 1}. ${botPeer}`);
    });

    const selectedBotIndex = parseInt(await askQuestion("Enter the bot number: "), 10);
    if (isNaN(selectedBotIndex) || selectedBotIndex < 1 || selectedBotIndex > botPeers.length) {
        console.log('Invalid selection. Please try again.');
        return;
    }

    const selectedBot = botPeers[selectedBotIndex - 1];
    const selectedUrl = urls[selectedBotIndex - 1]; 
    console.log(`Fetching refresh query ID for bot: ${selectedBot} with URL: ${selectedUrl}`);

    // Call the requestWebViewForClient function to get the query ID
    if (accounts.size === 0) {
        console.log('No accounts are logged in.');
        return;
    }

    const results = new Map();
    const resultLines = []; // Array to hold all results

    for (const [phoneNumber, client] of accounts.entries()) {
        try {
            const queryId = await requestWebViewForClient(client, phoneNumber, selectedBot, selectedUrl); 
            console.log(`Refresh Query ID for ${selectedBot} using ${phoneNumber}: ${queryId}`);

            results.set(phoneNumber, queryId); 

            resultLines.push(`${queryId}`); // Collect results

        } catch (error) {
            console.error(`Failed to get refresh query ID for ${selectedBot} using ${phoneNumber}:`, error);
        }
    }

    const dataFolder = 'data';
    if (!fs.existsSync(dataFolder)) {
        fs.mkdirSync(dataFolder, { recursive: true });
    }

    const sanitizedBotPeer = selectedBot.replace('@', '');
    const resultFile = path.join(dataFolder, `${sanitizedBotPeer}.txt`);

    // Write all results to the file, overwriting any existing content
    fs.writeFileSync(resultFile, resultLines.join('\n'), 'utf8'); 
    console.log(`All Query IDs saved to ${resultFile}`);
}

// Function to display the list of bots without numbering
function displayBotList() {
    const botListFile = 'bot_list.txt';
    const botPeers = readLinesFromFile(botListFile);
    console.log('----------------- List Bot ------------------------');
    if (botPeers.length === 0) {
        console.log('No bots found in bot_list.txt');
    } else {
        botPeers.forEach((botPeer) => {
            console.log(botPeer); 
        });
    }
    console.log('---------------------------------------------------');
}
function displayFigletText(text, font, color) {
    return new Promise((resolve, reject) => {
        figlet.text(text, { font: font }, function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                reject(err);
            } else {
                console.log(chalk[color](data));
                resolve();
            }
        });
    });
}
// Main function to handle user inputs
async function main() {
    printBanner();
    console.log(chalk.bold.green('Welcome to the Telegram Bot Utility!'));
    console.log(chalk.bold.green("----------------------------------"));
    console.log(chalk.blue(intro));
    console.log(chalk.bold.cyan("\nCredit:"));
    console.log(chalk.bold.green("GitHub: https://github.com/winsnip"));
    console.log(chalk.bold.green("Telegram: https://t.me/winsnip"));
    console.log(chalk.bold.green("----------------------------------"));
    console.log(chalk.bold.green("GitHub: https://github.com/Solana0x"))
    console.log(chalk.bold.green("----------------------------------"));;
    console.log(chalk.bold.green("GitHub: https://github.com/Galkurta"));
    console.log(chalk.bold.green("Telegram: https://t.me/galkurtarchive"));
    console.log(chalk.bold.green("----------------------------------"));
    console.log(chalk.yellow("zixine"));
    // Menampilkan banner secara terpisah agar rapi
    await displayFigletText('NOT FOR SALE!!!!!', 'Mini', 'red');
    await displayFigletText('FUCK FOR PEOPLE SELL THIS FOR MONEY!', 'Mini', 'red');

    console.log(chalk.bold.green("\nQuote for sellers:"));
    console.log(chalk.green("\"Greed can rob the world, but honesty can only get applause.\""));
    
    // Display the bot list at the start
    displayBotList();
    console.log(chalk.white("This is a script for logging into Telegram accounts, managing sessions, and retrieving WebView data for bots."));

    while (true) {
        console.log(chalk.bold('\n1. Login with phone number'));
        console.log(chalk.bold('2. Login with session file'));
        console.log(chalk.bold('3. Request WebView for all accounts'));
        console.log(chalk.bold('4. Logout and exit'));
        console.log(chalk.bold('5. Get Refresh Query ID for a selected bot')); // New option

        const choice = await askQuestion(chalk.bold("Please select an option (1-5): "));

        if (choice === '1') {
            await loginWithPhoneNumber();
        } else if (choice === '2') {
            await loginWithSessionFile();
        } else if (choice === '3') {
            await requestWebViewForAllClients();
        } else if (choice === '4') {
            console.log(chalk.bold.yellow('Logging out and exiting...'));
            for (const [, client] of accounts.entries()) {
                await logoutClient(client);
            }
            rl.close();
            break;
        } else if (choice === '5') {
            await getRefreshQueryId(); // Call the new function
        } else {
            console.log(chalk.bold.red('Invalid option. Please try again.'));
        }
    }
}

main();