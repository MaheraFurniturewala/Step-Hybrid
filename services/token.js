const fs = require("fs")
const readline = require("readline")
const SCOPES = require("./scopes")

require("dotenv").config()

module.exports = function getNewToken(oAuth2Client, callback, req, res) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES
    })
    console.log("Authorize this app by visiting this url:", authUrl)
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.question("Enter the code from that page here: ", (code) => {
        rl.close()
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error("Error retrieving access token", err)
            oAuth2Client.setCredentials(token)
            // Store the token to disk for later program executions
            fs.writeFile(
                process.env.TOKEN_PATH,
                JSON.stringify(token),
                (err) => {
                    if (err) return console.error(err)
                    console.log("Token stored to", process.env.TOKEN_PATH)
                }
            )
            callback(oAuth2Client, req, res)
        })
    })
}
