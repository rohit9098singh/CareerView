import dynamic from "next/dynamic"
import react from "react"

const Login=dynamic(()=>import("./Login"))

export const LoginHOC=()=>{
    return (
        <Login/>
    )
}