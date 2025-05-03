import { z } from "zod";

const forgotPasswordSchema=z.object({
    email:z.string().min(1,"Email is required").email("invalid email")
})


export default forgotPasswordSchema;