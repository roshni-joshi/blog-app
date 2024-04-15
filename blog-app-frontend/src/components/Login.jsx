import { Alert, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { DEFAULT_LOGIN } from '../util/DefaultDataConstants';
import { validateEmail } from '../util/BlogAppUtil';
import { Link, useNavigate } from 'react-router-dom';
import '../css/global.css';
import { login } from '../service/BlogAppApis';
import { UserContextProvider } from '../App';

function Login() {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContextProvider);
  const [loginCredentials, setLoginCredentials] = useState(DEFAULT_LOGIN);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  let navigate = useNavigate();

  const handleLogin = () => {
    setHasSubmitted(true);
    setIsInvalid(false);
    if (validateEmail(loginCredentials.email) && loginCredentials.password !== '') {
      login(loginCredentials, navigate, setIsInvalid, setIsLoggedIn);
    }
  }

  return (
    <Container maxWidth='xs'>
      <Grid container rowGap={3} columnSpacing={2}>
        <Grid item xs={12}>
          {isInvalid && <Alert severity="error">Invalid Credentials!</Alert>}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            value={loginCredentials.email}
            error={hasSubmitted && !validateEmail(loginCredentials.email)}
            helperText={
              (hasSubmitted && loginCredentials.email === '')
                ? 'Must not be empty'
                : ((hasSubmitted && !validateEmail(loginCredentials.email)) ? 'Invalid email' : '')
            }
            onChange={(event) => {
              setIsInvalid(false);
              setLoginCredentials(prev => ({ ...prev, email: event.target.value }))
            }} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            value={loginCredentials.password}
            error={hasSubmitted && loginCredentials.password === ''}
            helperText={
              (hasSubmitted && loginCredentials.password === '')
                ? 'Must not be empty'
                : ''
            }
            onChange={(event) => {
              setIsInvalid(false);
              setLoginCredentials(prev => ({ ...prev, password: event.target.value }))
            }} />
        </Grid>
        <Grid item xs={12} className='content-center'>
          <Button variant='contained' onClick={() => handleLogin()}>Login</Button>
        </Grid>
        <Grid item xs={12} className='content-center'>
          <Typography>New User? <Link to='/register'>Register</Link></Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
