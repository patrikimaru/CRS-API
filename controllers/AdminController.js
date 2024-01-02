const asyncHandler = require('express-async-handler')
const Admin = require('../models/AdminModel')
const jwt = require('jsonwebtoken');
const CrytpoJS = require('crypto-js')


const getAllAdmin = asyncHandler (async (req, res) => {
    const admin = await Admin.find({Admin})
    res.status(200).json(admin)
})


const getOneAdmin = asyncHandler (async (req, res) => {
    const admin = await Admin.findById(req.params.id)

    if(!admin){
        res.status(400)
        throw new Error('User no found')
    }
    
    res.status(200).json(admin)
})


const getMultiAdmin = asyncHandler (async (req, res) => {
    const admin = await Admin.find({Admin})
    res.status(200).json(admin)
})


const loginAdmin = asyncHandler(async (req, res) => {
    let { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400).json({ error: 'Please add all fields' });
      return;
    }
  
    const bytes = CryptoJS.AES.decrypt(password, process.env.SECRET_LOGIN_KEY);
    const originalPass = bytes.toString(CryptoJS.enc.Utf8);
  
    const admin = await Admin.findOne({ email });
  
    if (admin && originalPass === admin.password) {
      const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
  
  
      res.status(200).json({ success: true, message: 'Login successful', token });
    } else {
      res.status(401).json({ error: 'Wrong credentials' });
    }
});


const createAdmin = asyncHandler (async (req, res) => {
    const { 
        name,
        role,
        email,
        password
     } = req.body

    if(!name && !role){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExist = await Admin.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('Email already in use')
    }

    const cipher = CrytpoJS.AES.encrypt(password,  process.env.SECRET_LOGIN_KEY).toString()

    const admin = await Admin.create({
        name, 
        role,
        email, 
        password: cipher
    })

    if(admin){
        res.status(201).json({
            _id: admin.id,
            name: admin.name,
            role: admin.role,
            email: admin.email,
            password: admin.cipher
        })
    } else {
        res.status(400)
        throw new Error('Cant register')
    }
})


const updateAdmin = asyncHandler (async (req, res) => {
    const admin = await Admin.findById(req.params.id)

    if(!admin){
        res.status(400)
        throw new Error('User no found')
    }

    const updatedUser = await Admin.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    
    res.status(200).json(updatedUser)
})


const editAdminPassword = asyncHandler (async (req, res) => {
    const checkUser = await Admin.findById(req.params.id)

    if(!checkUser){
        res.status(400)
        throw new Error('User not found')
    }

    const cipher = CrytpoJS.AES.encrypt(req.body.password, process.env.SECRET_LOGIN_KEY).toString()
    const editUserPassword = await Admin.findByIdAndUpdate(
        req.params.id,
        {password: cipher},
        {new: true}
    )
    res.status(200).json(editUserPassword)
})


const deleteAdmin = asyncHandler (async (req, res) => {
    const admin = await Admin.findById(req.params.id)

    if(!admin){
        res.status(400)
        throw new Error('User no found')
    }

    await admin.deleteOne()

    res.status(200).json({ id: req.params.id})
})


const deleteMultiAdmin = asyncHandler (async (req, res) => {
    const admin = await Admin.findById(req.params.id)

    if(!admin){
        res.status(400)
        throw new Error('User no found')
    }

    await admin.deleteMany()

    res.status(200).json({ id: req.params.id})
})


module.exports = {
    getAllAdmin,
    getOneAdmin,
    getMultiAdmin,
    createAdmin,
    updateAdmin,
    editAdminPassword,
    deleteAdmin,
    deleteMultiAdmin,
    loginAdmin
}