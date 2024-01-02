const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')
const Crime = require('../models/CrimeReportModel');
const Accident = require('../models/AccidentReportModel');


const getAllUser = asyncHandler (async (req, res) => {
    const user = await User.find({User})
    res.status(200).json(user)
})


const getOneUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User no found')
    }
    
    res.status(200).json(user)
})


const getMultiUser = asyncHandler (async (req, res) => {
    const user = await User.find({User})
    res.status(200).json(user)
})


const getCrime = asyncHandler (async (req, res) => {
    const crimeRecord = await Crime.find({ userId: req.params.id}).populate('userId');
    res.status(200).json(crimeRecord);
})


const getCrimeSolved = asyncHandler (async (req, res) => {
    const solvedCrime = await Crime.find({ userId: req.params.id, action_status: "Solved" }).populate('userId');
    res.status(200).json(solvedCrime);
})


const getCrimeUnsolved = asyncHandler (async (req, res) => {
    const unsolvedCrime = await Crime.find({ userId: req.params.id, action_status: { $in: ["Pending", "InProgress"] } }).populate('userId');
    res.status(200).json(unsolvedCrime);
})


const getCrimeOngoing = asyncHandler (async (req, res) => {
    const ongoingCrime = await Crime.find({ userId: req.params.id, action_status: "InProgress" }).populate('userId');
    res.status(200).json(ongoingCrime);
})


const getAccident = asyncHandler (async (req, res) => {
    const accidentRecord = await Accident.find({ userId: req.params.id}).populate('userId');
    res.status(200).json(accidentRecord);
})


const getAccidentSolved = asyncHandler (async (req, res) => {
    const solvedAccident = await Accident.find({ userId: req.params.id, action_status: "Solved" }).populate('userId');
    res.status(200).json(solvedAccident);
})


const getAccidentUnsolved = asyncHandler (async (req, res) => {
    constAccidentCrime = await Crime.find({ userId: req.params.id, action_status: { $in: ["Pending", "InProgress"] } }).populate('userId');
    res.status(200).json(unsolvedAccident);
})


const createUser = asyncHandler (async (req, res) => {
    const { 
        id,
        name,
        birthday,
        sex,
        address,
        contact_no,
        email,
     } = req.body

    if(!name && !email){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('Email already in use')
    }
    
    const user = await User.create({
        _id: id,
        name,
        birthday,
        sex,
        address,
        contact_no,
        email,
    });


    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            birthday: user.birthday,
            sex: user.sex,
            address: user.address,
            contact_no: user.contact_no,
        })

    } else {
        res.status(400)
        throw new Error('Cant register')
    }
})


const updateUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User no found')
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    
    res.status(200).json(updatedUser)
})


const deleteUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User no found')
    }

    await user.deleteOne()

    res.status(200).json({ id: req.params.id})
})


const deleteMultiUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User no found')
    }

    await user.deleteMany()

    res.status(200).json({ id: req.params.id})
})


module.exports = {
    getAllUser,
    getOneUser,
    getMultiUser,
    getCrime,
    getCrimeUnsolved,
    getCrimeSolved,
    getCrimeOngoing,
    getAccident,
    getAccidentSolved,
    getAccidentUnsolved,
    createUser,
    updateUser,
    deleteUser,
    deleteMultiUser,
}