import dynamic from "next/dynamic"
import react from "react"

const ResetPassword=dynamic(()=>import("./ResetPassword"))

const ResetPasswordHOC=({ token }: { token: string })=>{
    return (
        <ResetPassword token={token} />
    )
}

export default ResetPasswordHOC

