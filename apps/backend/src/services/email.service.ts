import EventEmitter from 'events';
import { ReadStream } from 'fs';
import nodemailer, { Transporter } from 'nodemailer';
import { config } from '../config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

// Charger les variables d'environnement
require('dotenv').config();

export class EmailService {
    options = {};
    attachments = new Array();

    transporter: Transporter;
    constructor() {
        console.log("variables", process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.EMAIL_USERNAME);
        const mailOptions: SMTPTransport.Options = {
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.EMAIL_SECURE), // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USERNAME, // generated ethereal user
                pass: process.env.EMAIL_PASSWORD // generated ethereal password
            },
        };
        this.transporter = nodemailer.createTransport(mailOptions);

        this.options = {
            ...this.options,
            from: process.env.EMAIL_FROM, // sender address
            subject: config.mail.subject, // Subject line
            html: config.mail.content // html body
        }
    }

    addBase64File(filename: string, stream: String) {
        this.attachments.push({ filename: filename, content: stream, encoding: 'base64' });
    }

    addFile(filename: string, stream: Uint8Array) {
        this.attachments.push({ filename: filename, content: stream });
    }

    clearFiles() {
        this.attachments = new Array();
    }

    sendEmail(to: Array<string>, eventEmitter: EventEmitter): void {
        // send mail with defined transport object
        this.transporter.sendMail(
            {
                ...this.options,
                attachments: this.attachments,
                to: to.join(',')   // list of receivers
            }, (error, response) => {
                this.clearFiles();
                if (error) {
                    eventEmitter.emit('error', error);
                } else {
                    eventEmitter.emit('success');
                }
            });

    }
}