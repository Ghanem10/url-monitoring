'use strict'
const axios = require('axios');
const nodemailer = require('nodemailer');

// Create a transport to the desired email
const transportor = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.Gmail,
        pass: process.env.Password,
    },
});

// Check the status of the URL
async function checkURL(url) {

    try {

        const response = await axios.get(url);
        return response.status === 200;

    } catch (error) {
        return false;
    }
}

function sender(url) {
    
    // Mail configuration
    const mailOptions = {
        from: process.env.Gmail,
        to: process.env.Recipent,
        subject: "website is down",
        text: `The website ${url} is unreachable`,
        html: '<h1>Alert</h1>'
    };

    transportor.sendMail(mailOptions, (error, info) => {

        if (error) {
            console.log(`error sending an email: ${error}`);
        } else {
            console.log(`email sent to recepient: ${info.response}`);
        }
    });
}

module.exports = {
    sender, 
    checkURL
};