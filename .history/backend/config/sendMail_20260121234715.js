import {createTransport} from 'nodemailer'
const sendMail = async({email,subject,html})=>{
    const transfort = createTransport({
        host:"smtp.gmail.com",
        port:465,
        auth:{
            user:"riyad",
            pass:"riiiiiyad",
        },
    });

    await transfort.sendMail({
        from:"cfgc",
        to:email,
        subject,
        html
    })
}
export default sendMail