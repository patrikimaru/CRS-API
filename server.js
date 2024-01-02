const express = require('express')
const cookieParser = require("cookie-parser")
const connectDB = require('./database/db')
const cors = require('cors')
require('express-async-errors')
require('dotenv').config()
require('colors')

const port = process.env.PORT || 5000

connectDB()

const app = express()
app.use(cookieParser())

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Welcome to CRS API');
})

app.use('/api/users', require('./routes/UserRouter'))
app.use('/api/admins', require('./routes/AdminRouter'))
app.use('/api/accident-reports', require('./routes/AccidentReportRouter'))
app.use('/api/crime-reports', require('./routes/CrimeReportRouter'))

app.use((err, req, res, next) => {
  console.error('Error:'.red, err);
  res.status(500).json({ error: err });
})

app.listen(port, () => console.log(`Server started on port ${port}`.blue))