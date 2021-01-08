import express from 'express'
import { body } from 'express-validator'

const router = express.Router()

import { sendMail } from '../controllers/contactController.js'

router
  .route('/')
  .post(
    body('name')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Please input a minimum of 3 characters on your name')
      .isAlpha('en-US', { ignore: '-s' })
      .withMessage('Use only letters for the name'),
    body('email')
      .isEmail()
      .withMessage('Please Input Valid Email')
      .normalizeEmail(),
    body('message')
      .trim()
      .isLength({ min: 5 })
      .withMessage(
        "Please don't be shy.Message me with more than 5 characters"
      ),
    sendMail
  )

export default router
