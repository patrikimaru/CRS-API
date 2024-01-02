const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: {
        type: String, 
        required: [true, 'Please add an id'],
        trim: true,
        unique: true,
    },
    profilePic: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add your Name'],
    },
    birthday: {
        type: String,
        trim: true,
        required: [true, 'Please add your Birthday']
    },
    sex: {
        type: String,
        trim: true,
        enum: ["Male", "Female", "Others",],
        required: [true, 'Please add your Sex'],
    },
    address: {
        street: { type: String, trim: true,},
        houseNumber: { type: Number, trim: true,},
        barangay: { type: String, required:[true, 'Please add your barangay'],trim: true,},
        municipality: { type: String, required:[true, 'Please add your Municipality'],trim: true,}, 
        country: { type: String,   required: [true, 'Please add your country'],trim: true,},
    },
    contact_no: {
        type: Number,
        trim: true,
        required: [true, 'Please add your Contact Number'],
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)