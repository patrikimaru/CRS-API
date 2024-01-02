const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your Name'],
        trim: true,
    },
    role: {
        type: String,
        enum: ["admin","super-admin", ],
        required: [true, 'Please add your Role'],
        trim: true,

    },
    email: {
        type: String,
        required: [true, 'Please add your Email'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please add your Password'],
        trim: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Admin', adminSchema)