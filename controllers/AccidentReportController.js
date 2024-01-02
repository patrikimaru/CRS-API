const asyncHandler = require('express-async-handler')
const Accident = require('../models/AccidentReportModel')


const getAllAccident = asyncHandler (async (req, res) => {
    const accidentRecord = await Accident.find({Accident}).populate('userId')
    res.status(200).json(accidentRecord)
})


const getOneAccident = asyncHandler (async (req, res) => {
    const accidentRecord = await Accident.findById(req.params.id).populate('userId');

    if(!accidentRecord){
        res.status(400)
        throw new Error('Accident Report not found')
    }
    
    res.status(200).json(accidentRecord)
})


const getMultiAccident = asyncHandler (async (req, res) => {
    const accidentRecord = await Accident.find({Accident}).populate('userId');
    res.status(200).json(accidentRecord)
})


const getSolvedAccidents = asyncHandler(async (req, res) => {
    const solvedAccidents = await Accident.find({ action_status: "Solved" }).populate('userId');
  
    res.status(200).json(solvedAccidents)
})


const getUnsolvedAccidents = asyncHandler(async (req, res) => {
    const unsolvedAccidents = await Accident.find({ action_status:  "InProgress"}).populate('userId');
    res.status(200).json(unsolvedAccidents);
});


const reportAccident = asyncHandler (async (req, res) => {
    const { 
        photoURL,
        videoURL,
        date,
        location,
        description,
        fatalities,
        injured,
        vehicle_type,
        assigned_officer, 
        userId
     } = req.body

    if(!date && !location && !description && !vehicle_type && !userId){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const accidentRecordExist = await Accident.findOne({date, location, vehicle_type,assigned_officer})

    if(accidentRecordExist){
        res.status(400)
        throw new Error('Accident Report already exist')
    }

    const accidentRecord = await Accident.create({
        photoURL,
        videoURL,
        date,
        location,
        description,
        fatalities,
        injured,
        vehicle_type,
        assigned_officer,
        userId
    })

    if(accidentRecord){
        res.status(201).json({
            _id: accidentRecord.id,
            photoURL: accidentRecord.photoURL,
            videoURL: accidentRecord.videoURL,
            date: accidentRecord.date,
            location: accidentRecord.location,
            description: accidentRecord.description,
            fatalities: accidentRecord.fatalities,
            injured: accidentRecord.injured,
            vehicle_type: accidentRecord.vehicle_type,
            assigned_officer: accidentRecord.assigned_officer,
            userId: accidentRecord.userId
        })
    } else {
        res.status(400)
        throw new Error('Cant add Accident Report')
    }
})


const updateAccident = asyncHandler (async (req, res) => {
    const accidentRecord = await Accident.findById(req.params.id)

    if(!accidentRecord){
        res.status(400)
        throw new Error('Accident Report not found')
    }

    const updatedAccidentRecord = await Accident.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    
    res.status(200).json(updatedAccidentRecord)
})


const deleteAccident = asyncHandler (async (req, res) => {
    const accidentRecord = await Accident.findById(req.params.id)

    if(!accidentRecord){
        res.status(400)
        throw new Error('Accident Report not found')
    }

    await accidentRecord.deleteOne()

    res.status(200).json({ id: req.params.id})
})


const deleteMultiAccident = asyncHandler (async (req, res) => {
    const accidentRecord = await Accident.findById(req.params.id)

    if(!accidentRecord){
        res.status(400)
        throw new Error('Accident Report not found')
    }

    await accidentRecord.deleteMany()

    res.status(200).json({ id: req.params.id})
})


const updateActionStatus = asyncHandler(async (req, res) => {
    try {
        const accidentRecord = await Accident.findById(req.params.id);

        if (!accidentRecord) {
            res.status(404).json({ error: 'Accident Report not found' });
            return;
        }

        accidentRecord.action_status = req.body.actionStatus; 

        
        await accidentRecord.save();

        res.status(200).json(accidentRecord);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update action status' });
    }
});


const updateAssignedOfficer = asyncHandler(async (req, res) => {
    try {
        const { assigned_officer } = req.body;
        const accidentRecord = await  Accident.findByIdAndUpdate(req.params.id, { assigned_officer }, { new: true });

        if (!accidentRecord) {
            res.status(404).json({ error: 'Crime Report not found' });
            return;
        }

        res.status(200).json(accidentRecord);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update assigned officer' });
    }
})


const deleteAllAccident = asyncHandler (async (req, res) => {
    await Accident.deleteMany()
    res.status(200).json("Delete All Succesfully!")
})


module.exports = {
    getAllAccident,
    getOneAccident,
    getMultiAccident,
    getSolvedAccidents,
    getUnsolvedAccidents,
    reportAccident,
    updateAccident,
    deleteAccident,
    updateActionStatus,
    deleteMultiAccident,
    updateAssignedOfficer,
    deleteAllAccident
}