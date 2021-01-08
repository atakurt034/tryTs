import React, { useState, useEffect } from 'react'
import {
  Button,
  Container,
  TextField,
  makeStyles,
  Paper,
} from '@material-ui/core'

import SendIcon from '@material-ui/icons/Send'
import { sendMail } from '../actions/contactActions'
import { CONTACT_SEND_MAIL_RESET } from '../constants/contactConstants'

import { useDispatch, useSelector } from 'react-redux'

import { ModalLoader } from './ModalLoader'
import { ModalMessage } from './ModalMessage'
import { ContactModal } from './contacktModal/ContactModal'
import { Fade } from 'react-reveal'


const useStyles = makeStyles((theme) => ({
  paperWrapper: {
    padding: 20,
    borderRadius: 10,
  },
}))

const namelKeywords = [
  'Please input a minimum of 3 characters on your name',
  'Use only letters for the name',
]
const emailKeywords = ['Please Input Valid Email']
const messageKeywords = [
  "Please don't be shy.Message me with more than 5 characters",
]


export const MessageForm:React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [mail, setMail] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const { name, email, subject, message } = mail

  
interface SendMail {
  contactSendMail: {}[]
}
interface SendMailProps {
  data: {}[],
  loading: boolean,
  error:  any,
  status: string
  success: boolean
}

  const contactSendMail = useSelector<SendMail>((state) => state.contactSendMail)
  const { loading, error, success, status } = contactSendMail as SendMailProps


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setMail({ ...mail, [name]: value })
  }

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    
    dispatch(
      sendMail({
        name,
        email,
        subject,
        message,
      })
    )
  }

  const closeHandler = () => {
    setOpen(false)
    dispatch({ type: CONTACT_SEND_MAIL_RESET })
  }
  useEffect(() => {
    if (!loading && !error) {
      if (success) {
        setOpen(true)
        setMail({ name: '', email: '', subject: '', message: '' })
      }
    }
  }, [loading, error, dispatch, success, status])

  const errorHandler = error &&
  [...error.split(',')].some((e) =>
    namelKeywords.includes(e) ? true : false
  )

  return (
    <>
      {open && <ContactModal open={open} handleClose={closeHandler} />}
      {error && (
        <ModalMessage variant='error'>
          {[...error.split(',')].map((i) => (
            <h4 key={i}>{i}</h4>
          ))}
        </ModalMessage>
      )}
      {loading ? (
        <ModalLoader />
      ) : (
        <Fade delay={200} duration={500}>
          <Paper elevation={12} className={classes.paperWrapper}>
            <Container component='main' maxWidth='xs'>
              <form
                onSubmit={submitHandler}
                action='mailto:atakurt034@gmail.com'
                method='POST'
                encType='multipart/form-data'
              >
                <TextField
                  error={errorHandler}
                  type='text'
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='name'
                  label='Full Name'
                  name='name'
                  value={name}
                  autoFocus
                  onChange={handleChange}
                />
                <TextField
                  error={
                    error &&
                    [...error.split(',')].some((e) =>
                      emailKeywords.includes(e) ? true : false
                    )
                  }
                  type='email'
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  label='Email Address'
                  name='email'
                  value={email}
                  onChange={handleChange}
                />
                <TextField
                  type='text'
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  label='Subject'
                  name='subject'
                  value={subject}
                  onChange={handleChange}
                />
                <TextField
                  error={
                    error &&
                    [...error.split(',')].some((e) =>
                      messageKeywords.includes(e) ? true : false
                    )
                  }
                  type='text'
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  label='Message'
                  multiline
                  rows={5}
                  name='message'
                  value={message}
                  onChange={handleChange}
                />

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='default'
                  size='large'
                  startIcon={<SendIcon />}
                >
                  Submit
                </Button>
              </form>
            </Container>
          </Paper>
        </Fade>
      )}
    </>
  )
}
