import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import logger from 'morgan'

import router from './src/routes/index.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

mongoose.Promise = global.Promise
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(err => console.error(err))
mongoose.set('debug', true)

app.use(logger('dev'))
app.use(express.json())
app.use('/api/v1', router)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
