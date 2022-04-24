const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { PubSub } = require("@google-cloud/pubsub")

require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, (err) => {
    if (err) throw err
    console.log("Connected to MongoDB")
})

app.use("/", require("./routes/list"))
app.use("/", require("./routes/notifs"))

app.get("/auth/callback", (req, res) => {
    res.send(req.query.code)
})

// app.get("/notifs", async (req, res) => {

//     const registeration = google.classroom.registerations.creat

//     const pubsub = new PubSub({ projectId: "step-hybrid" })

//     // Creates a new topic
//     const [topic] = await pubsub.createTopic("assignments")
//     console.log(`Topic ${topic.name} created.`)

//     // Creates a subscription on that new topic
//     const [subscription] = await topic.createSubscription("assignments")

//     // Receive callbacks for new messages on the subscription
//     subscription.on("message", (message) => {
//         console.log("Received message:", message.data.toString())
//         process.exit(0)
//     })

//     // Receive callbacks for errors on the subscription
//     subscription.on("error", (error) => {
//         console.error("Received error:", error)
//         process.exit(1)
//     })
// })

app.listen(PORT, (err) => {
    if (err) {
        throw err
    }
    console.log("Server running on port : ", PORT)
})
