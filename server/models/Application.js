const { Schema, model } = require('mongoose');

const resumeSchema = require('./Resume');
const coverLetterSchema = require('./CoverLetter');

const applicationSchema = new Schema({
    job_title: {
        type: String,
        required: true
    },
    lead_source: {
        type: String,
        required: true 
    },
    resume: [resumeSchema],
    cover_letter: [coverLetterSchema],
    notes: {
        type: String,
        required: false
    },
    follow_up: {
        type: String,
        required: false
    },
    date_applied: {
        type: Date,
        required: true
    }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

applicationSchema.virtual('daysEllapsed').get(function () {
    return ((Date.now() - Date.parse(this.date_applied)) / 14400000)
})

const Application = model('Application', applicationSchema)

module.exports = Application;