import express from 'express'
import dotenv from 'dotenv'
import 'colors'
import morgan from 'morgan'
import path from 'path'

import {errorHandler, notFound} from './utils/middleWares'

const app = express()
dotenv.config()

const PORT = process.env.PORT
const NODE = process.env.NODE_ENV
app.use(express.json())
if (NODE === 'development') {
    app.use(morgan('dev'))
}

if (NODE === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }

app.use(errorHandler)
app.use(notFound)


app.listen(PORT, function(){
    console.log(`Server running at port ${PORT} in ${NODE} mode`.yellow.bold)
})