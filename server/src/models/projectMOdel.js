const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectname: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    projectdetails: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("Project", projectSchema);