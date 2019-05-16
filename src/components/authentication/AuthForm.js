import React from 'react'
import { authURL } from '../../services/authURL'
import googleSvg from '../../assets/svg/google.svg'
import githubSvg from '../../assets/svg/github.svg'

const AuthForm = props => {
  const { isSignUp } = props

  return isSignUp ? (
    <form id='signup-form'>
      <div className='form-oauth-providers'>
        <a href={`${authURL}google`}>
          <img src={googleSvg} alt='' />
          <p>Sign up with Google</p>
        </a>
      </div>
      <div className='form-oauth-providers'>
        <a href={`${authURL}github`}>
          <img src={githubSvg} alt='' />
          <p>Sign up with GitHub</p>
        </a>
      </div>
    </form>
  ) : (
    <form id='login-form'>
      <div className='form-oauth-providers'>
        <a href={`${authURL}google`}>
          <img src={googleSvg} alt='' />
          <p>Login with Google</p>
        </a>
      </div>
      <div className='form-oauth-providers'>
        <a href={`${authURL}github`}>
          <img src={githubSvg} alt='' />
          <p>Login with GitHub</p>
        </a>
      </div>
    </form>
  )
}

export default AuthForm
