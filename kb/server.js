require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL,  { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', () => console.log('Connection to Database'))

app.use(express.json())

const kbRouter = require('./routes/kb')
app.use('/kb', kbRouter)

app.listen(3000, () => console.log('Server Started'))