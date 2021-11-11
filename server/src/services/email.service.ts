import nodemailer from 'nodemailer';
import { config } from '../config';

export class EmailService {
    options = {}
        

    transporter: any;
    constructor() {
       console.log(config.mail.host);
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

    addFile(filename:string, stream: any){
       this.options= {
           ...this.options, 
            attachments: [{   
                filename: filename,
                content: stream
            }]
        }
    }

    sendEmail(to: string): void {
        console.log(
            `Send email to '${to}'`
        );
        // send mail with defined transport object
        this.transporter.sendMail({ 
            ...this.options,
            to // list of receivers
        });
    }
}