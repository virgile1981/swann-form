import { ReadStream } from 'fs';
import nodemailer from 'nodemailer';
import { config } from '../config';

export class EmailService {
    options = {};
    attachments = new Array();

    transporter: any;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.mail.host,
            port: config.mail.port,
            secure: config.mail.secure, // true for 465, false for other ports
            auth: {
                user: config.mail.username, // generated ethereal user
                pass: config.mail.password // generated ethereal password
            },
        });

        this.options = {
            ...this.options,
            from: config.mail.from, // sender address
            subject:config.mail.subject, // Subject line
            html: config.mail.content // html body
        } 
    }

    addBase64File(filename:string, stream: String){
        this.attachments.push({filename: filename, content: stream, encoding: 'base64' });
     }

    addFile(filename:string, stream: ReadStream){
       this.attachments.push({filename: filename, content: stream });
    }

    sendEmail(to: Array<string>): void {
        // send mail with defined transport object
        this.transporter.sendMail(
            {...this.options,
                attachments: this.attachments,
                to: to.join(',')   // list of receivers
        });
        this.attachments = new Array();
    }
}