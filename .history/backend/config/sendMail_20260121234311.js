import {createTransport} from 'nodemailer'
const sendMail = async({email,subject,html})=>{
    const transfort = createTransport({
        host:"smtp.gmail.com",
        port:465,
        auth:{
            user:"riyad"
            pass:"riiiiiyad"
        }
    })
}