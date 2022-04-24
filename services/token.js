const fs = require("fs")
const readline = require("readline")

const SCOPES = [
    "https://www.googleapis.com/auth/classroom.courses.readonly",
    "https://www.googleapis.com/auth/classroom.rosters.readonly",
    "https://www.googleapis.com/auth/classroom.coursework.me",
    "https://www.googleapis.com/auth/classroom.coursework.me.readonly",
    "https://www.googleapis.com/auth/classroom.coursework.students",
    "https://www.googleapis.com/auth/classroom.coursework.students.readonly",
    "https://www.googleapis.com/auth/classroom.announcements",
    "https://www.googleapis.com/auth/classroom.announcements.readonly",
    "https://www.googleapis.com/auth/classroom.guardianlinks.students.readonly",
    "https://www.googleapis.com/auth/classroom.guardianlinks.me.readonly",
    "https://www.googleapis.com/auth/classroom.topics",
    "https://www.googleapis.com/auth/classroom.push-notifications"
]
const TOKEN_PATH = "token.json"

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
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err)
                console.log("Token stored to", TOKEN_PATH)
            })
            callback(oAuth2Client, req, res)
        })
    })
}
