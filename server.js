const express = require('express');
const { checkURL, sender } = require('./scripts');
const executTimer = require('node-cron');
const dotenv = require('dotenv');
dotenv.config();

/**
 * 1- program will receive couple of URLs.
 * 2- check them periodically.
 * 3- displayes the results on the website
 * 4- sends an email if unreachable. 
*/

const app = express();
const port = process.env.PORT || 5000;

// Random URLs
const monitorURLs = [
    'http://domainSUSUS.com/something',
    'http://serverIOAA.com/something',
    'http://someURLISU.com/something',
];

// Check the urls every 5 min
executTimer.schedule('*/1 * * * *', async () => {

    // Iterate over the random urls
    for (const url of monitorURLs) {

        // whether is reachable or not, use checkURL
        const isReachable = await checkURL(url);
        
        // If it's not reachable then send email
        if (!isReachable) {
            sender(url);
        }
    }
});

// Ending point
app.get('/api', (req, res) => {

    let resutlsHTML = '<h1>Monitor URL...</h1>';
    res.send(resutlsHTML);
});

app.listen(port);