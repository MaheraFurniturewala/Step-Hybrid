const express = require("express")
const authorize = require("../services/google-auth")
const { google } = require("googleapis")
const Student = require("../models/Students")

const router = express.Router()

function login(auth, req, res) {
    const service = google.people({ version: "v1", auth })
    service.people.get(
        {
            resourceName: "people/me",
            personFields: "names,emailAddresses,phoneNumbers"
        },
        async (err, r) => {
            if (err) return console.error("The API returned an error: " + err)
            const data = r.data
            console.log(r.data)
            const profile = await Student.findOne({
                email: data.emailAddresses[0].value
            })
            console.log(await Student.find({}))
            if (!profile) {
                const student = new Student({
                    name: data.names[0].displayName,
                    email: data.emailAddresses[0].value,
                    contact: data.phoneNumbers[0].canonicalForm
                })

                await student.save()
                res.redirect("/")
            }
        }
    )
}

router.get("/login", (req, res) => {
    authorize(login, req, res)
})

module.exports = router