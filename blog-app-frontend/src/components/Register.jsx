import React, { useState } from 'react'
import { DEFAULT_REGISTRATION } from '../util/DefaultDataConstants';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../util/BlogAppUtil';
import { register } from '../service/BlogAppApis';

function Register() {
  const [registrationData, setRegistrationData] = useState(DEFAULT_REGISTRATION);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  let navigate = useNavigate();

  const handleRegister = () => {
    setHasSubmitted(true);
    if(registrationData.firstname !== '' && registrationData.lastname !== '' 
        && validateEmail(registrationData.email) && registrationData.password !== '') {
      register(registrationData, navigate);
    }
  }

  return (
    <Container maxWidth='xs'>
      <Grid container rowGap={3} columnSpacing={2}>
      <Grid item xs={6}>
          <TextField
            fullWidth
            id="firstname"
            label="Firstname"
            variant="outlined"
            value={registrationData.firstname}
            error={hasSubmitted && registrationData.firstname === ''}
            helperText={
              (hasSubmitted && registrationData.firstname === '')
                ? 'Must not be empty'
                : ''
            }
            onChange={(event) => {
              setRegistrationData(prev => ({ ...prev, firstname: event.target.value }))
            }} />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="lastname"
            label="Lastname"
            variant="outlined"
            value={registrationData.lastname}
            error={hasSubmitted && registrationData.lastname === ''}
            helperText={
              (hasSubmitted && registrationData.lastname === '')
                ? 'Must not be empty'
                : ''
            }
            onChange={(event) => {
              setRegistrationData(prev => ({ ...prev, lastname: event.target.value }))
            }} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            value={registrationData.email}
            error={hasSubmitted && !validateEmail(registrationData.email)}
            helperText={
              (hasSubmitted && registrationData.email === '')
                ? 'Must not be empty'
                : ((hasSubmitted && !validateEmail(registrationData.email)) ? 'Invalid email' : '')
            }
            onChange={(event) => {
              setRegistrationData(prev => ({ ...prev, email: event.target.value }))
            }} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            value={registrationData.password}
            error={hasSubmitted && registrationData.password === ''}
            helperText={
              (hasSubmitted && registrationData.password === '')
                ? 'Must not be empty'
                : ''
            }
            onChange={(event) => {
              setRegistrationData(prev => ({ ...prev, password: event.target.value }))
            }} />
        </Grid>
        <Grid item xs={12} className='content-center'>
          <Button variant='contained' onClick={() => handleRegister()}>Register</Button>
        </Grid>
        <Grid item xs={12} className='content-center'>
          <Typography>Already registered? <Link to='/'>Login</Link></Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Register
