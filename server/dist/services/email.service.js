"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
class EmailService {
    constructor() {
        this.options = {};
        this.attachments = new Array();
        this.transporter = nodemailer_1.default.createTransport({
            host: config_1.config.mail.host,
            port: config_1.config.mail.port,
            secure: config_1.config.mail.secure,
            auth: {
                user: config_1.config.mail.username,
                pass: config_1.config.mail.password // generated ethereal password
            },
        });
        this.options = Object.assign(Object.assign({}, this.options), { from: config_1.config.mail.from, subject: config_1.config.mail.subject, html: config_1.config.mail.content // html body
         });
    }
    addBase64File(filename, stream) {
        this.attachments.push({ filename: filename, content: stream, encoding: 'base64' });
    }
    addFile(filename, stream) {
        this.attachments.push({ filename: filename, content: stream });
    }
    clearFiles() {
        this.attachments = new Array();
    }
    sendEmail(to, eventEmitter) {
        // send mail with defined transport object
        this.transporter.sendMail(Object.assign(Object.assign({}, this.options), { attachments: this.attachments, to: to.join(',') // list of receivers
         }), (error, response) => {
            this.clearFiles();
            if (error) {
                eventEmitter.emit('error', error);
            }
            else {
                eventEmitter.emit('success');
            }
        });
    }
}
exports.EmailService = EmailService;
