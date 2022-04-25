const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        contact: {
            type: Number,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Students", studentSchema)
