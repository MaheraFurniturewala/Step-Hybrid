const express = require("express")
const authorize = require("../services/google-auth")
const { google } = require("googleapis")

const router = express.Router()

function listCourses(auth) {
    const classroom = google.classroom({ version: "v1", auth })
    classroom.courses.list(
        {
            pageSize: 10
        },
        (err, res) => {
            if (err) return console.error("The API returned an error: " + err)
            const courses = res.data.courses
            if (courses && courses.length) {
                console.log("Courses:")
                courses.forEach((course) => {
                    console.log(`${course.name} (${course.id})`)
                })
            } else {
                console.log("No courses found.")
            }
        }
    )
}

router.get("/", (req, res) => {
    authorize(listCourses)
})

module.exports = router
