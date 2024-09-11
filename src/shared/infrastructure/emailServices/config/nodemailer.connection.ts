import {createTransport} from 'nodemailer'

export const transporter = createTransport({ //archivo de configuracion del servicio
    host: "smtp.gmail.com",
    port: 465,               // true for 465, false for other ports
    secure: true,
    auth: {
        user: process.env.EMAILNOTIFY,
        pass: process.env.PASSWORDMAIL,
     }
});