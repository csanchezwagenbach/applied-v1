const { Schema } = require('mongoose');

const coverLetterSchema = new Schema({
    url: {
        type: String
    }
});

module.exports = coverLetterSchema;