const { google } = require("googleapis")
const fs = require("fs")
const getNewToken = require("./token")

const TOKEN_PATH = "token.json"
require("dotenv").config()

module.exports = function authorize(callback) {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    )

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        console.log(token)
        if (err) return getNewToken(oAuth2Client, callback)
        oAuth2Client.setCredentials(JSON.parse(token))
        callback(oAuth2Client)
    })
    //getNewToken(oAuth2Client, callback)
}
