const { Schema } = require('mongoose');

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
        type: Text,
        required: false
    },
    follow_up: {
        type: Text,
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

module.exports = applicationSchema;