import React from 'react'

function Login({user, setUser,signIn}) {
  return (
    <div className='text-green-500' onClick={signIn}>Login</div>
  )
}

export default Login