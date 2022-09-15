import React, { FC } from 'react'
import Button from '@mui/material/Button'

const Login: FC = function () {
  return (
    <div>
      <h1>Login </h1>
      <Button variant='contained' disableElevation>
        Submit
      </Button>{' '}
    </div>
  )
}

export default Login
