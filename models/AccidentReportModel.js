const mongoose = require('mongoose')

const accidentSchema = mongoose.Schema({
    photoURL: {
        type: [String],
        trim: true,
    },
    videoURL: {
        type: String,
        trim: true,
    },
    date: {
        type: String,
        trim: true,
        required: [true, 'Please add a Value']
    },
    location: {
        street: { type: String, trim: true,},
        barangay: { type: String, required:[true, 'Please add a barangay'],trim: true,},
        municipality: { 
            type: String, 
            trim: true,
            required:[true, 'Please add a municipality'],
        }, 
        province: { 
            type: String,
            trim: true,
            default: "Pangasinan",
            required:[true, 'Please add a province'],
        }, 
        country: { 
            type: String,  
            trim: true,
            default: "Philippines",
            required: [true, 'Please add a country'],
         },
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Please add a Value']
    },
    fatalities: {
        type: String,
        trim: true,
    },
    injured: {
        type: Number,
        trim: true,
    },
    vehicle_type: {
        type: String,
        trim: true,
    },
    assigned_officer: {
        type: String,
        trim: true,
        enum: [
            "PO1 - Juan Dela Cruz",
            "SPO1 - Pedro Penduko", 
            "Officer Amber Gongalves",
            "Officer Mollie Jourdan", 
            "Officer Ulises Esmay",
            "Officer Braydon Linders"
        ],
    },
    action_status: {
        type: String,
        trim: true,
        enum: ["Pending", "InProgress", "Solved", "Resolved", "Closed Case"],
        default: "Pending",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please add a Value']
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Accident Report', accidentSchema)