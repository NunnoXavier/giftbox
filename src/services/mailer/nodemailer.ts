import nodemailer from 'nodemailer'
import { IMailer, IMailerConfig, IMailerOptions } from './IMailer'

const config: IMailerConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,    
    auth: {
        user: process.env.MAIL_USER || '',
        pass: process.env.MAIL_PASS || ''
    },
    dkim: {
        domainName: 'seusite.com',
        keySelector: 'dkim',
        privateKey: process.env.MAIL_PASS || ''
      },
}

const transporter = nodemailer.createTransport(config)

export const mailer: IMailer = {
    sendMail: async  ({to, subject, html}: IMailerOptions) => {
        try {
            const info = await transporter.sendMail({
                from: 'Si GiftBox <nunnoxavier@gmail.com>',
                to,
                subject,
                html
            }) 

            return { data: info.response, error: null }            
        } catch (error:any) {
            return { data: null, error: error.message }
        }
    }
}