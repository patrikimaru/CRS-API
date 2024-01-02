const express  = require('express')
const authenticateToken = require('../middlewares/AuthenticateToken');
const { 
    getAllUser, 
    createUser, 
    updateUser, 
    deleteUser, 
    getOneUser, 
    deleteMultiUser, 
    getMultiUser, 
    getCrime,
    getCrimeUnsolved,
    getCrimeSolved,
    getAccident,
    getAccidentUnsolved,
    getAccidentSolved
} = require('../controllers/UserController')

const { getArchivesCrime } = require('../controllers/CrimeReportController')

const router = express.Router()

router.route('/').post(createUser)

router.route('/:id').put(updateUser).get(getOneUser)

router.route('/:id/reports').get()
router.route('/:id/crime').get(getCrime)
router.route('/:id/crime/solved').get(getCrimeSolved)
router.route('/:id/crime/unsolved').get(getCrimeUnsolved)
router.route('/:id/crime/archives').get(getArchivesCrime)
router.route('/:id/accident').get(getAccident)
router.route('/:id/accident/solved').get(getAccidentSolved)
router.route('/:id/accident/unsolved').get(getAccidentUnsolved)

router.use(authenticateToken);

router.route('/').get(getAllUser)
router.route('/:id').delete(deleteUser)
router.route('/:ids').delete(deleteMultiUser).get(getMultiUser)


module.exports = router