"use client"
import ResetPasswordHOC from '@/components/screen/Auth/ResetPassword/ResetPasswordHOC'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const params = useParams();
  const token = typeof params?.token === 'string' ? params.token : '';
  return (
     <div>
      <ResetPasswordHOC token={token}/>
     </div>
  )
}

export default page
