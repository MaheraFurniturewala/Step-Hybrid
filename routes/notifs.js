const express = require("express")
const authorize = require("../services/google-auth")
const { google } = require("googleapis")
const { PubSub } = require("@google-cloud/pubsub")
const processAndSend = require("../services/process")

require("dotenv").config()

const router = express.Router()

function listen(auth, req, res) {
    const classroom = google.classroom({
        version: "v1",
        auth
    })

    classroom.registrations.create(
        {
            requestBody: {
                feed: {
                    feedType: "COURSE_WORK_CHANGES",
                    courseWorkChangesInfo: {
                        courseId: process.env.COURSE_ID
                    }
                },
                cloudPubsubTopic: {
                    topicName: process.env.PUBSUB_TOPIC
                }
            }
        },
        (err, r) => {
            console.log(err, r)
            const pubSubClient = new PubSub({
                projectId: process.env.PROJECT_ID
            })
            const subscription = pubSubClient.subscription(process.env.SUBS)
            subscription.on("message", (message) => {
                console.log(message.data.toString())
                const data = JSON.parse(message.data)
                message.ack()

                processAndSend(classroom, data)
            })
        }
    )
}

router.get("/notif", (req, res) => {
    authorize(listen, req, res)
})

module.exports = router
