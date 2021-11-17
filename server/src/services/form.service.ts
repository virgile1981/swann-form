import { config } from "../config";
import { EmailService } from "./email.service";
import { FileService } from "./file.service";
import fs from 'fs';
import { DemandePersonnelleDTO } from "./dto/demandePersonnelle.dto";
import Mustache from "mustache";
import { DemandeFlashDTO } from "./dto/demandeFlash.dto";
import { DemandePeintureDTO } from "./dto/demandePeinture.dto";
import { DemandeAutreDTO } from "./dto/demandeAutre.dto";
import { ImageService } from "./image.service";
import { FileDTO } from "./dto/file.dto";


export class FormService {
    
    private fileService: FileService;
    
    private emailService: EmailService;

    private imageService: ImageService;
    
    private data: any;

    private readonly demandeTemplate = "./templates/demandeForm.mustache";

    private readonly demandePersonnelleTemplate = "./templates/demandePersonnelleForm.mustache";

    private readonly demandeFlashTemplate = "./templates/demandeFlashForm.mustache";

    private readonly demandePeintureTemplate = "./templates/demandePeintureForm.mustache";

    private readonly demandeAutreTemplate = "./templates/demandeAutreForm.mustache";

    constructor(){
        this.fileService = new FileService();
        this.emailService = new EmailService();
        this.imageService = new ImageService();
  }
    async save(demandeDTO: any) {
    var self = this;
    var partials;
    var html = fs.readFileSync(this.demandeTemplate, 'utf8');
    
        switch(demandeDTO.demande) {
            case "personnelle":
                partials = {demandeForm: fs.readFileSync(this.demandePersonnelleTemplate, 'utf8')};
                self.data = new DemandePersonnelleDTO().inject(demandeDTO);
               
                if(self.data.imagesEmplacement) {
                    for (const image of self.data.imagesEmplacement) 
                    {
                        if(image?.buffer){
                            this.emailService.addBase64File(config.mail.emplacementFilename+".jpg",image.buffer);
                            var thumbnail = await this.imageService.generateThumbnail(image)
                            self.data.imagesEmplacementThumbnail.push(thumbnail);
                        }
                    }      
                }
                if(self.data.imagesInspiration) {
                    for( const image of self.data.imagesInspiration) {
                        if(image?.buffer){
                            this.emailService.addBase64File(config.mail.inspirationFilename+".jpg",image.buffer); 
                            var thumbnail = await this.imageService.generateThumbnail(image);
                            self.data.imagesInspirationThumbnail.push(thumbnail);    
                        }
                    }
                }
                break;
            case "flash":
                partials = {demandeForm: fs.readFileSync(this.demandeFlashTemplate, 'utf8')};
                self.data = new DemandeFlashDTO().inject(demandeDTO);
                if(self.data.imagesEmplacement) {
                    self.data.imagesEmplacement.forEach( (image:FileDTO,index:number) => {
                        if(image?.buffer) {
                            this.emailService.addBase64File(config.mail.emplacementFilename + (index+1) + ".jpg",image.buffer);
                        }
                    })
                }
                if(self.data.imagesFlash) {
                    self.data.imagesFlash.forEach( (image:FileDTO,index:number) => {
                        if(image?.buffer){
                            this.emailService.addBase64File(config.mail.flashFilename+ (index+1)+".jpg",image.buffer);
                        }
                    })
                }
                break;
            case "peinture":
                partials = {demandeForm: fs.readFileSync(this.demandePeintureTemplate, 'utf8')};
                self.data = new DemandePeintureDTO().inject(demandeDTO);
                if(self.data.imagesReference) {
                    self.data.imagesReference.forEach( (image:FileDTO,index:number) => {
                        if(image?.buffer) {
                            this.emailService.addBase64File(config.mail.referenceFilename+(index+1)+".jpg",image.buffer);
                        }
                    })     
                }
                break;
            default:
                partials = {demandeForm: fs.readFileSync(this.demandeAutreTemplate, 'utf8')};
                self.data = new DemandeAutreDTO().inject(demandeDTO);
                break;
        }       
        html = Mustache.render(html, self.data,partials);
        this.fileService.generatePDF(html, function(err, stream) {
            if(demandeDTO.email != null) {
                self.emailService.addFile(config.mail.pdfFilename+".pdf",stream);
                self.emailService.sendEmail(new Array(demandeDTO.email,config.mail.from));
            }
        });
}

}