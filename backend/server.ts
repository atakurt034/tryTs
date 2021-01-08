import express, {Express} from 'express'
import dotenv from 'dotenv'
import 'colors'
import morgan from 'morgan'
import path from 'path'

import connectDB from './config/db'
import {errorHandler, notFound} from './utils/middleWares'
import projects from './routes/projectsRoutes'
import contacts from './routes/contactRoutes'

import serverless from 'serverless-http'
const router = express.Router()


const app = express()
dotenv.config()
connectDB()

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
    router.get('/', (req, res) => {
      res.send('API is running....')
    })
  }

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

 


app.use('/api/projects', projects)
app.use('/api/contacts', contacts)


app.use(errorHandler)
app.use(notFound)


app.listen(PORT, function(){
    console.log(`Server running at port ${PORT} in ${NODE} mode`.yellow.bold)
})


app.use('/.netlify/functions/server', router);  // path must route to lambda
exports.handler = serverless(app)