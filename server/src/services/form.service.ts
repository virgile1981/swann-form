import { config } from "../config";
import { EmailService } from "./email.service";
import { FileService } from "./file.service";
import fs from 'fs';
import { DemandePersonnelleDTO } from "./dto/demandePersonnelle.dto";
import Mustache from "mustache";
import { DemandeFlashDTO } from "./dto/demandeFlash.dto";
import { DemandePeintureDTO } from "./dto/demandePeinture.dto";
import { DemandeAutreDTO } from "./dto/demandeAutre.dto";


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
    var html = fs.readFileSync("./templates/demandeForm.mustache", 'utf8');
    
        switch(demandeDTO.demande) {
            case "personnelle":
                partials = {demandeForm: fs.readFileSync("./templates/demandePersonnelleForm.mustache", 'utf8')};
                data = new DemandePersonnelleDTO().inject(demandeDTO);
            if(data.imageEmplacement?.buffer) {
                    this.emailService.addBase64File(config.mail.emplacementFilename+".jpg",data.imageEmplacement.buffer);
                }
                if(data.imageInspiration?.buffer) {
                    this.emailService.addBase64File(config.mail.inspirationFilename+".jpg",data.imageInspiration.buffer);
                }
                break;
            case "flash":
                partials = {demandeForm: fs.readFileSync("./templates/demandeFlashForm.mustache", 'utf8')};
                data = new DemandeFlashDTO().inject(demandeDTO);
                if(data.imageEmplacement?.buffer) {
                    this.emailService.addBase64File(config.mail.emplacementFilename+".jpg",data.imageEmplacement.buffer);
                }
                if(data.imageFlash?.buffer) {
                    this.emailService.addBase64File(config.mail.flashFilename+".jpg",data.imageFlash.buffer);
                }
                break;
            case "peinture":
                partials = {demandeForm: fs.readFileSync("./templates/demandePeintureForm.mustache", 'utf8')};
                data = new DemandePeintureDTO().inject(demandeDTO);
                if(data.imageReference?.buffer) {
                    this.emailService.addBase64File(config.mail.referenceFilename+".jpg",data.imageReference.buffer);
                }
                break;
            default:
                partials = {demandeForm: fs.readFileSync("./templates/demandeAutreForm.mustache", 'utf8')};
                data = new DemandeAutreDTO().inject(demandeDTO);
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