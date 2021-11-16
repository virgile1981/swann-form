import { ReadStream } from 'fs';
import pdf from 'html-pdf';

export class FileService {
   
    public async generatePDF(html: any, callback: (err: Error, stream: ReadStream)=> void) {
        var options = { 
            "border": {
            "top": "0.25in",            // default is 0, units: mm, cm, in, px
            "right": "0.5in",
            "left": "0.5in"
          }};
        pdf.create(html, options).toStream(callback);
    }
}