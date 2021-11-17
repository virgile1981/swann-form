import { DemandeDTO } from "./demande.dto";
import { FileDTO } from "./file.dto";

export class DemandeFlashDTO extends DemandeDTO{
    villeValues = ["Paris","Toulouse","Nantes","Brétignolles-sur-Mer"];
    planificationValues = ["Le plus tôt possible","Le mois prochain","L'année prochaine"];
    descriptif?: string;
    ville?: string;
    modifications?: string;
    imagesFlash?: FileDTO[];
    imagesEmplacement?: FileDTO[];
    imagesFlashThumbnail?: FileDTO[];
    imagesEmplacementThumbnail?: FileDTO[];
    taille?: string;
    budget?: string;
    planification?: string;

    isAutreVille(): boolean {
        if(this.ville != null) { 
            return !this.villeValues.includes(this.ville);
        }
        return false;
    }

    isAutrePlanification(): boolean {
        if(this.planification != null) {
            return !this.planificationValues.includes(this.planification);
        }
        return false;
    }

    isTailleDeLArtiste(): boolean {
        return this.taille === "tailleDeLArtiste";
    }

    inject(demandeFlashDTO: DemandeFlashDTO): DemandeFlashDTO {
        super.inject(demandeFlashDTO);        
        this.descriptif = demandeFlashDTO.descriptif;
        this.ville = demandeFlashDTO.ville;
        this.modifications = demandeFlashDTO.modifications;
        this.imagesFlash = demandeFlashDTO.imagesFlash;
        this.imagesEmplacement = demandeFlashDTO.imagesEmplacement;
        this.taille = demandeFlashDTO.taille;
        this.budget = demandeFlashDTO.budget;
        this.planification = demandeFlashDTO.planification;
        return this;       
    }

    villesWithMark(): any[] {
        return this.valuesWithSelectMark(this.villeValues,this.ville);
    }

    planificationsWithMark(): any[] {
        return this.valuesWithSelectMark(this.planificationValues,this.planification); 
    }

}