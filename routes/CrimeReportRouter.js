const express  = require('express');
const authenticateToken = require('../middlewares/AuthenticateToken');
const { 
    getAllCrime,
    getSolvedCrime,
    getUnsolvedCrime, 
    reportCrime, 
    updateCrime,
    deleteCrime,
    getOneCrime,
    deleteMultiCrime,
    updateCrimeStatus,
    getMultiCrime,
    updateAssignedOfficer,
    deleteAllCrime,
    getArchivesCrime
} = require('../controllers/CrimeReportController')

const router = express.Router()

router.route('/').post(reportCrime)

router.use(authenticateToken);

router.route('/').get(getAllCrime).delete(deleteAllCrime)

router.route('/solved').get(getSolvedCrime)

router.route('/unsolved').get(getUnsolvedCrime)

router.route('/archives').get(getArchivesCrime)

router.route('/:id').get(getOneCrime).put(updateCrime).delete(deleteCrime)

router.route('/:ids').get(getMultiCrime).delete(deleteMultiCrime)

router.route('/:id/action-status').put(updateCrimeStatus);

router.route('/:id/update-assigned-officer').put(updateAssignedOfficer);

module.exports = router