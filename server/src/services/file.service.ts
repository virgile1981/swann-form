import { ReadStream } from 'fs';
import pdf from 'html-pdf';

export class FileService {
   
    public async generatePDF(html: any, callback: (err: Error, stream: ReadStream)=> void) {
        var options = { };
        pdf.create(html, options).toStream(callback);
    }
}