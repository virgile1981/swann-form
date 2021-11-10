import { DemandeDTO } from "./services/dto/demande.dto";
import { FileService } from "./services/file.service";

export class FormService {
    fileService: FileService;
  
    constructor(){
        this.fileService = new FileService();
  }
    save(demande: DemandeDTO) {
        this.fileService.generatePDF();
    console.log("nom " + demande.nom);
  }

}