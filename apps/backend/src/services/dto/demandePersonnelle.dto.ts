import { DemandeDTO } from "./demande.dto";
import { FileDTO } from "./file.dto";


export class DemandePersonnelleDTO extends DemandeDTO {
    villeValues = ["Paris", "Toulouse", "Saint-Hilaire-de-Riez"];
    planificationValues = ["Le plus tôt possible", "Le mois prochain", "L'année prochaine"];
    descriptif?: string;
    ville?: string;
    idee?: string;
    imagesInspiration?: FileDTO[];
    imagesEmplacement?: FileDTO[];
    imagesInspirationThumbnail?: FileDTO[] = [];
    imagesEmplacementThumbnail?: FileDTO[] = [];
    taille?: string;
    budget?: string;
    planification?: string;

    isAutreVille(): boolean {
        if (this.ville != null) {
            return !this.villeValues.includes(this.ville);
        }
        return false;
    }

    isAutrePlanification(): boolean {
        if (this.planification != null) {
            return !this.planificationValues.includes(this.planification);
        }
        return false;
    }

    isBudgetIndetermine(): boolean {
        return this.budget === "pas déterminé";
    }

    inject(demandePersonnelleDTO: DemandePersonnelleDTO): DemandePersonnelleDTO {
        super.inject(demandePersonnelleDTO);
        this.descriptif = demandePersonnelleDTO.descriptif;
        this.ville = demandePersonnelleDTO.ville;
        this.idee = demandePersonnelleDTO.idee;
        this.imagesInspiration = demandePersonnelleDTO.imagesInspiration;
        this.imagesEmplacement = demandePersonnelleDTO.imagesEmplacement;
        this.taille = demandePersonnelleDTO.taille;
        this.budget = demandePersonnelleDTO.budget;
        this.planification = demandePersonnelleDTO.planification;
        return this;
    }

    villesWithMark(): any[] {
        return this.valuesWithSelectMark(this.villeValues, this.ville);
    }

    planificationsWithMark(): any[] {
        return this.valuesWithSelectMark(this.planificationValues, this.planification);
    }

}