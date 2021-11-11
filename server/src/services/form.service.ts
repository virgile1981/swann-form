import { config } from "../config";
import { EmailService } from "./email.service";
import { FileService } from "./file.service";
import fs from 'fs';
import { DemandePersonnelleDTO } from "./dto/demandePersonnelle.dto";
import Mustache from "mustache";

export class FormService {
    fileService: FileService;
    emailService: EmailService;
    constructor(){
        this.fileService = new FileService();
        this.emailService = new EmailService();
  }
    save(demandeDTO: any) {
    var self = this;
    var data;
    var partials;
    var html = fs.readFileSync('./templates/demandeForm.mustache', 'utf8');

    switch(demandeDTO.demande) {
        case "personnelle":
            partials = {demandeForm: fs.readFileSync('./templates/demandePersonnelleForm.mustache', 'utf8')};
            data = new DemandePersonnelleDTO().inject(demandeDTO);
           if(data.imageEmplacement!= null) {
                this.emailService.addBase64File(config.mail.emplacementFilename+".jpg",data.imageEmplacement);
            }
            if(data.imageInspiration!= null) {
                this.emailService.addBase64File(config.mail.inspirationFilename+".jpg",data.imageInspiration);
            }
            break;
        case "flash":
            
            break;
    }       
    html = Mustache.render(html, data,partials);
    this.fileService.generatePDF(html, function(err, stream) {
        if(demandeDTO.email != null) {
            self.emailService.addFile(config.mail.pdfFilename+".pdf",stream);            
            self.emailService.sendEmail(new Array(demandeDTO.email,config.mail.from));
        }
    });
}

}