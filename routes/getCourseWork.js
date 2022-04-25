const express = require("express")
const authorize = require("../services/google-auth")
const { google } = require("googleapis")
require('dotenv').config();

const router = express.Router()

function getCourseWork(auth, req, res) {
    const classroom = google.classroom({ version: "v1", auth })
    classroom.courses.courseWork.list(
        {
            courseId: process.env.COURSE_ID,
            pageSize: 10
        },
        (err, r) => {
            const courseWork = r.data.courseWork;

            if (courseWork && courseWork.length) {
                console.log(courseWork);
                res.json({ msg: courseWork });

            } else {
                res.json({ msg: "No CourseWork" });
            }
        }
    )
}

router.get("/", async (req, res) => {
    console.log("callled");
    authorize(getCourseWork, req, res)
})

module.exports = router
