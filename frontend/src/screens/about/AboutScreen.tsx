import React, { useState } from 'react'
import { makeStyles, CardMedia, Grid, Container } from '@material-ui/core'
import { TypeWords } from './typewriter/Typewriter'
import clsx from 'clsx'
import './aStyles.css'

import { Fade } from 'react-reveal'

const useStyles = makeStyles((theme) => ({
  about: {
    height: '100%',
  },
  imagewrapper: {
    height: '55vh',
    margin: 'auto',
    position: 'relative',
    padding: 20,
  },
  typewriter: {
    textAlign: 'center',
    margin: 'auto',
    padding: 10,
    [theme.breakpoints.down('xs')]: {
      margin: '0 auto',
    },
  },
  image: {
    height: '100%',
    borderRadius: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  },
}))

export const About: React.FC = () => {
  const classes = useStyles()
  const [img, setImg] = useState('/images/profile.jpg')
  const [load, setLoad] = useState(false)

  const imageHandler = (sentImage:string) => {
    setImg(sentImage)
  }

  return (
    <div id='about'>
      <Container maxWidth='md'>
        <div id='page' className={classes.about}>
          <Grid container>
            <Grid item xs={12} sm={6} className={classes.imagewrapper}>
              <Fade in={load}>
                <CardMedia
                  className={clsx(classes.image, 'image')}
                  image={img}
                  component='img'
                />
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.typewriter}>
              <Container className={classes.container}>
                <TypeWords
                  image={imageHandler}
                  enter={() => setLoad(true)}
                  exit={() => setLoad(false)}
                />
              </Container>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}
