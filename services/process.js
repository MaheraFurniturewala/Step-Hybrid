const messager = require("./message")
const Student = require("../models/Students")

let prev = ""

module.exports = function (classroom, data) {
    if (data.collection === "courses.courseWork") {
        classroom.courses.courseWork.list(
            {
                courseId: data.resourceId.courseId,
                pageSize: 10
            },
            (err, res) => {
                const courseWorks = res.data.courseWork
                const courseWork = courseWorks.filter((c) => {
                    return (
                        c.courseId === data.resourceId.courseId &&
                        c.id === data.resourceId.id
                    )
                })

                if (
                    courseWork &&
                    courseWork.length &&
                    courseWork[0].state === "PUBLISHED" &&
                    data.resourceId.id !== prev
                ) {
                    prev = data.resourceId.id
                    console.log(courseWork)
                    const text = `${courseWork[0].title} assigned for course ${courseWork[0].courseId} at ${courseWork[0].creationTime}. ${courseWork[0].description}`

                    classroom.courses.students.list(
                        {
                            courseId: data.resourceId.courseId
                        },
                        async (e, r) => {
                            for (s of r.data.students) {
                                console.log(s)
                                const profile = await Student.findOne({
                                    name: s.profile.name.fullName
                                })
                                console.log(profile)
                                if (profile) messager(profile.contact, text)
                            }
                        }
                    )
                }
            }
        )
    }
}
