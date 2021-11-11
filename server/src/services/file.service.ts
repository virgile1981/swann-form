import fs from 'fs'; 
import pdf from 'html-pdf';
import Mustache from 'mustache';
import { DemandePersonnelleDTO } from './dto/demandePersonnelle.dto';

export class FileService {
    savePDF(buffer: Buffer) {
        console.log("savePDF");
        fs.writeFile('monpdf.pdf', buffer, function(err) {
            if (err) {
              return console.log(err);
            }
          });
    }

    public async generatePDF(demandeDTO: any, callback: (err: Error, stream: fs.ReadStream)=> void) {
        var options = { };
        var html = fs.readFileSync('./templates/demandeForm.mustache', 'utf8');
        var data;
        var partials;
        switch(demandeDTO.demande) {
            case "personnelle":
                partials = {demandeForm: fs.readFileSync('./templates/demandePersonnelleForm.mustache', 'utf8')};
                data = new DemandePersonnelleDTO().inject(demandeDTO);
                break;
            case "flash":
              
                break;
        }               
        html = Mustache.render(html, data,partials);
        pdf.create(html, options).toStream(callback);
    }

}