import fs from 'fs'; 
import pdf from 'html-pdf';
import { DemandeDTO } from './dto/demande.dto';
import Mustache from 'mustache';

export class FileService {
    savePDF(buffer: Buffer) {
        console.log("savePDF");
        fs.writeFile('monpdf.pdf', buffer, function(err) {
            if (err) {
              return console.log(err);
            }
          });
    }

    public async generatePDF(demandeDTO: DemandeDTO) {
     
        var options = { };
        var html = "";
        switch(demandeDTO.demande) {
            case "personnelle":
                html = fs.readFileSync('./templates/demandePersonnelleForm.html', 'utf8');
                var data = new DemandeDTO().inject(demandeDTO); 
                html = Mustache.render(html, data);
                //console.log(JSON.stringify(demandeDTO.prepareForTemplate()));
                break;
            case "flash":
                break;
        }               
        
        pdf.create(html, options).toFile('./form.pdf', function(err, res) {
          if (err) return console.log(err);
          console.log(res); // { filename: '/app/businesscard.pdf' }
        });
    }

}