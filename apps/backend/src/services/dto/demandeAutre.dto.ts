import { DemandeDTO } from "./demande.dto";

export class DemandeAutreDTO extends DemandeDTO{
    descriptif?: string;

    inject(demandeAutreDTO: DemandeAutreDTO): DemandeAutreDTO {
        super.inject(demandeAutreDTO);       
        this.descriptif = demandeAutreDTO.descriptif; 
        return this;
    }
}
