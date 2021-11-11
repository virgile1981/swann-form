import { DemandeDTO } from "./demande.dto";



export class DemandePersonnelleDTO extends DemandeDTO{
    villes? = ["Paris","Toulouse","Nantes","Brétignolles-sur-Mer"];
    descriptif?: string;
    ville?: string;
    idee?: string;
    imageInspiration?: string;
    imageEmplacement?: string;
    taille?: string;
    budget?: string;
    planification?: string;

    isVilleParis() : boolean {
        return this.ville === "Paris";
    }
    isVilleToulouse() : boolean {
        return this.ville === "Toulouse";
    }
    isVilleNantes() : boolean {
        return this.ville === "Nantes";
    }
    isVilleBretignolles(): boolean {
        return this.ville === "Brétignolles-sur-Mer";
    }
    isVilleAutre(): boolean {
        return !this.isVilleParis() && !this.isVilleToulouse() && !this.isVilleNantes() && !this.isVilleBretignolles();
    }

    isBudgetIndetermine(): boolean {
        return this.budget === "indetermine";
    }

    isPlanificationPlusTotPossible(): boolean {
        return this.planification === "plustotpossible";
    }
    isPlanificationMoisProchain(): boolean {
        return this.planification === "moisprochain";
    }
    isPlanificationAnneeProchaine(): boolean {
        return this.planification === "anneeprochaine";
    }
    isPlanificationAutre(): boolean {
        return !this.isPlanificationAnneeProchaine() && !this.isPlanificationPlusTotPossible() && !this.isPlanificationMoisProchain();
    }

    inject(demandePersonnelleDTO: DemandePersonnelleDTO): DemandePersonnelleDTO {
        super.inject(demandePersonnelleDTO);        
        this.descriptif = demandePersonnelleDTO.descriptif;
        this.ville = demandePersonnelleDTO.ville;
        this.idee = demandePersonnelleDTO.idee;
        this.imageInspiration = demandePersonnelleDTO.imageInspiration;
        this.imageEmplacement = demandePersonnelleDTO.imageEmplacement;
        this.taille = demandePersonnelleDTO.taille;
        this.budget = demandePersonnelleDTO.budget;
        this.planification = demandePersonnelleDTO.planification;
        return this;       
    }

    villesWithMark(): any[] {
        const villesWithMark = new Array() ;
        console.log(this.villes);
        this.villes?.forEach( elt => {
            console.log(elt);
            var city = {ville: elt, isSelected: this.ville===elt};
            villesWithMark.push(city);
        });
        console.log(JSON.stringify(villesWithMark));
        return villesWithMark;
    }
}