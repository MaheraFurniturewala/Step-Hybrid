const express = require("express")
const authorize = require("../services/google-auth")
const { google } = require("googleapis")

require("dotenv").config()

const router = express.Router()

function setPubSub(auth) {
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
        (err, res) => {
            console.log(err, res)
        }
    )
}

router.get("/notif", (req, res) => {
    authorize(setPubSub)
})

module.exports = router
