const { Schema, model } = require('mongoose');

const resumeSchema = require('./Resume');
const coverLetterSchema = require('./CoverLetter');

const applicationSchema = new Schema({
    job_title: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    lead_source: {
        type: String,
        required: true 
    },
    description: {
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
        required: true,
        get: (date) => {
            if (date) return date.toISOString().split("T")[0];
        }
    }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);



applicationSchema.virtual('daysEllapsed').get(function () {
    return Date.now()
})

const Application = model('Application', applicationSchema)

module.exports = Application;