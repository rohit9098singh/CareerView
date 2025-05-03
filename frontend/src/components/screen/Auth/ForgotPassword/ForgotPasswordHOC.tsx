import dynamic from "next/dynamic";

const ForgotPassword=dynamic(()=>import("./ForgotPassword"))

export const ForgotPasswordHOC=()=>{
    return <ForgotPassword/>
}


