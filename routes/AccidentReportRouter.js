const express  = require('express')
const authenticateToken = require('../middlewares/AuthenticateToken');
const { 
    getAllAccident, 
    getSolvedAccidents,
    getUnsolvedAccidents,
    reportAccident, 
    updateAccident,
    deleteAccident,
    getOneAccident,
    deleteMultiAccident,
    updateActionStatus,
    getMultiAccident,
    updateAssignedOfficer,
    deleteAllAccident,
} = require('../controllers/AccidentReportController')
const router = express.Router()

router.route('/').post(reportAccident)

router.use(authenticateToken);

router.route('/').get(getAllAccident).delete(deleteAllAccident)

router.route('/solved').get(getSolvedAccidents)

router.route('/unsolved').get(getUnsolvedAccidents)

router.route('/:id').get(getOneAccident).put(updateAccident).delete(deleteAccident)

router.route('/:ids').get(getMultiAccident).delete(deleteMultiAccident)

router.route('/:id/action-status').put(updateActionStatus);

router.route('/:id/update-assigned-officer').put(updateAssignedOfficer);

module.exports = router