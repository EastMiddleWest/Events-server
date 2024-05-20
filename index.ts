require('dotenv').config()
import express = require('express')
import mongoose = require('mongoose')
import Routes from './routes/router'
import cors from 'cors'



const PORT = process.env.PORT || 5001

const app = express()
app.use(express.json())
app.use(cors({
  exposedHeaders: 'Authorization',
}))
app.use(Routes)


mongoose.connect(process.env.DB_URL!)
.then(()=> console.log('Connected to DB'))
.catch((error) => console.log(error))


app.listen(PORT,() => console.log(`Server started on ${PORT} at ${(new Date()).toLocaleTimeString()}`))