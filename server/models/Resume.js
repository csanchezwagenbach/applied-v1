const { Schema } = require('mongoose');

const resumeSchema = new Schema({
    url: {
        type: String
    }
});

module.exports = resumeSchema;