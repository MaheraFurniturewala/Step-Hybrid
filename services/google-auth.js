const { google } = require("googleapis")
const fs = require("fs")
const getNewToken = require("./token")

require("dotenv").config()

module.exports = async function authorize(callback, req, res) {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    )
    // Check if we have previously stored a token.
    fs.readFile(process.env.TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback, req, res)
        oAuth2Client.setCredentials(JSON.parse(token))
        callback(oAuth2Client, req, res)
    })
    //getNewToken(oAuth2Client, callback)
}
