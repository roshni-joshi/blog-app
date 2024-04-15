import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div>
      <Typography>Some exception occured. Please click <Link to='/'>here</Link> to login.</Typography>
    </div>
  )
}

export default Error
