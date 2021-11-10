import { DemandeDTO } from "./services/dto/demande.dto";
import { FileService } from "./services/file.service";

export class FormService {
    fileService: FileService;
  
    constructor(){
        this.fileService = new FileService();
  }
    save(demandeDTO: DemandeDTO) {
    
    this.fileService.generatePDF(demandeDTO);
    console.log("nom " + demandeDTO.nom);
}

}