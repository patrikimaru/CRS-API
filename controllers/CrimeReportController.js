const asyncHandler = require('express-async-handler')
const Crime = require('../models/CrimeReportModel')


const getAllCrime = asyncHandler (async (req, res) => {
    const crimeRecord = await Crime.find({Crime}).populate('userId');
    res.status(200).json(crimeRecord)
})


const getOneCrime = asyncHandler (async (req, res) => {
    const crimeRecord = await Crime.findById(req.params.id).populate('userId');

    if(!crimeRecord){
        res.status(400)
        throw new Error('Appointment no found')
    }
    
    res.status(200).json(crimeRecord)
})


const getMultiCrime = asyncHandler (async (req, res) => {
    const crimeRecord = await Crime.find({Crime}).populate('userId');
    res.status(200).json(crimeRecord)
})


const getSolvedCrime = asyncHandler(async (req, res) => {
    const solvedCrime = await Crime.find({ action_status: "Solved" }).populate('userId');
  
    res.status(200).json(solvedCrime)
})


const getArchivesCrime = asyncHandler(async (req, res) => {
    const archivesCrime = await Crime.find({ action_status: "Pending" }).populate('userId');
    res.status(200).json(archivesCrime)
})


const getUnsolvedCrime = asyncHandler(async (req, res) => {
    const unsolvedCrime = await Crime.find({action_status: "InProgress" }).populate('userId');
    res.status(200).json(unsolvedCrime)
})


const reportCrime = asyncHandler (async (req, res) => {
    const { 
        photoURL,
        videoURL,
        type_crime,
        name_crime,
        description,
        location,
        incident_date,
        assigned_officer,
        userId,
     } = req.body

    if(!type_crime && !name_crime && !description && !location && !incident_date && !userId){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const crimeRecordExist = await Crime.findOne({type_crime, name_crime, description, incident_date, location, assigned_officer})

    if(crimeRecordExist){
        res.status(400)
        throw new Error('Timeslot already in use')
    }

    const crimeRecord = await Crime.create({
        photoURL,
        videoURL,
        type_crime,
        name_crime,
        description,
        location,
        incident_date,
        assigned_officer,
        userId
    })

    if(crimeRecord){
        res.status(201).json({
            _id: crimeRecord.id,
            photoURL: crimeRecord.photoURL,
            videoURL: crimeRecord.videoURL,
            type_crime: crimeRecord.type_crime,
            name_crime: crimeRecord.name_crime,
            description: crimeRecord.description,
            location: crimeRecord.location,
            incident_date: crimeRecord.incident_date,
            assigned_officer: crimeRecord.assigned_officer,
            userId: crimeRecord.userId
        })
    } else {
        res.status(400)
        throw new Error('Cant add new crime report')
    }
})


const updateCrime = asyncHandler (async (req, res) => {
    const crimeRecord = await Crime.findById(req.params.id)

    if(!crimeRecord){
        res.status(400)
        throw new Error('Crime Record not found')
    }

    const updatedCrimeRecord = await Crime.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    
    res.status(200).json(updatedCrimeRecord)
})


const deleteCrime = asyncHandler (async (req, res) => {
    const crimeRecord = await Crime.findById(req.params.id)

    if(!crimeRecord){
        res.status(400)
        throw new Error('Crime Record no found')
    }

    await crimeRecord.deleteOne()

    res.status(200).json({ id: req.params.id})
})


const deleteMultiCrime = asyncHandler (async (req, res) => {
    const crimeRecord = await Crime.findById(req.params.id)

    if(!crimeRecord){
        res.status(400)
        throw new Error('User no found')
    }

    await crimeRecord.deleteMany()

    res.status(200).json({ id: req.params.id})
})


const deleteAllCrime = asyncHandler (async (req, res) => {
    await Crime.deleteMany()
    res.status(200).json("Delete All Succesfully!")
})


const updateCrimeStatus = asyncHandler(async (req, res) => {
    try {
        const crimeRecord = await Crime.findById(req.params.id);

        if (!crimeRecord) {
            res.status(404).json({ error: 'Crime Report not found' });
            return;
        }

        crimeRecord.action_status = req.body.actionStatus;

        await crimeRecord.save();

        res.status(200).json(crimeRecord);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update action status' });
    }
});


const updateAssignedOfficer = asyncHandler(async (req, res) => {
    try {
        const { assigned_officer } = req.body;
        const crimeRecord = await Crime.findByIdAndUpdate(req.params.id, { assigned_officer }, { new: true });

        if (!crimeRecord) {
            res.status(404).json({ error: 'Crime Report not found' });
            return;
        }

        res.status(200).json(crimeRecord);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update assigned officer' });
    }
})


module.exports = {
    getAllCrime,
    getOneCrime,
    getMultiCrime,
    getSolvedCrime,
    getUnsolvedCrime,
    getArchivesCrime,
    reportCrime,
    updateCrime,
    deleteCrime,
    updateCrimeStatus,
    deleteMultiCrime,
    updateAssignedOfficer,
    deleteAllCrime
}