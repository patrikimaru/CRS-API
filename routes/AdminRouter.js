const express  = require('express')
const authenticateToken = require('../middlewares/AuthenticateToken');
const { 
    createAdmin, 
    loginAdmin, 
    updateAdmin, 
    deleteAdmin, 
    getOneAdmin, 
    getAllAdmin, 
    deleteMultiAdmin, 
    getMultiAdmin, 
    editAdminPassword
} = require('../controllers/AdminController')
const router = express.Router()

router.route('/').post(createAdmin)

router.route('/login').post(loginAdmin)

router.use(authenticateToken);

router.route('/').get(getAllAdmin)

router.route('/:id').put(updateAdmin).delete(deleteAdmin).get(getOneAdmin)

router.route('/:ids').delete(deleteMultiAdmin).get(getMultiAdmin)

router.route('/edit-admin-password/:id').put(editAdminPassword)

module.exports = router