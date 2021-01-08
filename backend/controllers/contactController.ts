import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import Server from '../models/server'
import User from '../models/user'
import { validationResult } from 'express-validator'
import { ErrorRequestHandler } from 'express'
dotenv.config()


const updateEmailCount = async () => {
  await Server.findByIdAndUpdate(
    process.env.SERVER_ID,
    { $inc: { emailsSentCount: 1 } },
    { new: true }
  )
}

export const sendMail = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  const ttl = 3600000
  const { email, name, message, subject } = req.body

  const transport = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  }

  const transporter = nodemailer.createTransport(transport)
  
  const mail = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: subject,
    text: `
  from:
  ${name} 

  contact: ${email}

  message: 

  ${message}`,
  }

  const now = new Date()
  let user = await User.findOne({ email })
  
  
  if (email) {
    if (!errors.isEmpty()) {
      const errorString = errors.array().map((result) => result.msg)
      res.status(422)
      throw new Error(errorString.toString())
    } else {
      if (user) {
        if (user.time < now.getTime()) {
          user.name = name
          user.email = email
          user.message = message
          user.time = now.getTime() + ttl

          const updated = await user.save()
          transporter.sendMail(mail, (err, data) => {
            if (err) {
              res.json({
                status: 'fail',
                valid: false,
                data: updated,
              })
            } else {
              res.json({ status: 'success', valid: true, data: updated })
            }
          })
          updateEmailCount()
        } else {
          res.json({ valid: false, data: user })
        }
      } else {
        const createdUser = await User.create({
          name: name,
          email: email,
          message: message,
          time: now.getTime() + ttl,
        })

        if (createdUser) {
          transporter.sendMail(mail, (err, data) => {
            if (err) {
              res.json({
                status: 'fail',
                valid: false,
                data: createdUser,
              })
            } else {
              res.json({ status: 'success', valid: true, data: createdUser })
            }
          })
          updateEmailCount()
        }
      }
    }
  }
})
