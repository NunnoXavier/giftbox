import { secureHeapUsed } from 'crypto';
import { TransportOptions } from 'nodemailer'

export interface IMailerOptions {
    to: string;
    subject: string;
    html: string;
}

export interface IMailer {
    sendMail({to, subject, html}:IMailerOptions): Promise<{ data: string|null, error: string|null }>;
}

export interface IMailerConfig extends TransportOptions {
    host: string;
    port: number;
    secure?: boolean; // true para 465, false para outras portas    
    service?: string;
    auth: {
        user: string;
        pass: string;
    },
    dkim?: {
        domainName: string;
        keySelector: string;
        privateKey: string;
    }    
}