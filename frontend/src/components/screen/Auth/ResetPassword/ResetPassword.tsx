import React from 'react'
import ResetPasswordForm from './components/ResetPasswordForm'

const ResetPassword = ({ token }: { token: string }) => {
  return (
    <div>
       <ResetPasswordForm token={token}/>
    </div>
  )
}

export default ResetPassword
