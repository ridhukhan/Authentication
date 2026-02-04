import {    email, z  } from "zod"

export const registerSchema =z.object({

fullname: z.string().min(2,"Name atleast 3 char.."),
email: z.string().email("invalid email"),
password: z.string().min(8,"password at least 8 charecter")
    
})