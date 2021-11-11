import { config } from "../config";
import { DemandeDTO } from "./dto/demande.dto";
import { EmailService } from "./email.service";
import { FileService } from "./file.service";

export class FormService {
    fileService: FileService;
    emailService: EmailService;
    constructor(){
        this.fileService = new FileService();
        this.emailService = new EmailService();
  }
    save(demandeDTO: DemandeDTO) {
    var self = this;
    
    this.fileService.generatePDF(demandeDTO, function(err, pdfStream) {
        if(demandeDTO.email != null) {
            console.log("envoi d'email");
            self.emailService.addFile("formulaire.pdf",pdfStream);
            self.emailService.sendEmail(demandeDTO.email);
        }
    });
    console.log("nom " + demandeDTO.nom);
}

}