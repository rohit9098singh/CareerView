import React from 'react'
import DeleteAccountDialog from './components/DeleteAccountDialog'
import ChangePasswordForm from './components/ChangePasswordForm'

const Settings = () => {
  return (
    <div className='min-h-screen mt-[88px] max-w-7xl mx-auto flex flex-col gap-6'>
        <ChangePasswordForm/>
        <DeleteAccountDialog/>
    </div>
  )
}

export default Settings
