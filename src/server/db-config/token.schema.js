const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Token = new Schema(
    {
        id: { type: String },
        name: { type: String, required: true },
        category: { type: String , required: true},
        description: { type: String, required: true },
        cost: { type: Number , required: true},
        supply: { type: Number , required: true},
        filePath: { type: String , required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('token', Token)