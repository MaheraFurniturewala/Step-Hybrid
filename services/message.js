require("dotenv").config()

const VONAGE_API_KEY = process.env.VONAGE_API_KEY
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET

const Vonage = require("@vonage/server-sdk")

const vonage = new Vonage({
    apiKey: VONAGE_API_KEY,
    apiSecret: VONAGE_API_SECRET
})

module.exports = function (to, text) {
    const from = "Step Hybrid"

    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err)
        } else {
            if (responseData.messages[0]["status"] === "0") {
                console.log("Message sent successfully.")
            } else {
                console.log(
                    `Message failed with error: ${responseData.messages[0]["error-text"]}`
                )
            }
        }
    })
}
