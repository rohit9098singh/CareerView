import dynamic from "next/dynamic"

const Signup=dynamic(()=>import("./Signup"))

const SignupHOC=()=>{
    return (
        <Signup/>
    )
}

export default SignupHOC

