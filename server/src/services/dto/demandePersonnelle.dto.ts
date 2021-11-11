import { DemandeDTO } from "./demande.dto";



export class DemandePersonnelleDTO extends DemandeDTO{
    villeValues = ["Paris","Toulouse","Nantes","Brétignolles-sur-Mer"];
    planificationValues = ["Le plus tôt possible","Le mois prochain","L'année prochaine"];
    descriptif?: string;
    ville?: string;
    idee?: string;
    imageInspiration?: string;
    imageEmplacement?: string;
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

    isBudgetIndetermine(): boolean {
        return this.budget === "pas déterminé";
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

    valuesWithSelectMark(values: string[],value?: string) : any[]{
        const valuesWithMark = new Array() ;
        
        values.forEach( elt => {
            console.log(elt);
            var map = {value: elt, isSelected: value===elt};
            valuesWithMark.push(map);
        });
        console.log(JSON.stringify(valuesWithMark));
        return valuesWithMark;
    }

    villesWithMark(): any[] {
        return this.valuesWithSelectMark(this.villeValues,this.ville);
        /*
        const villesWithMark = new Array() ;
        
        this.villeValues?.forEach( elt => {
            console.log(elt);
            var city = {ville: elt, isSelected: this.ville===elt};
            villesWithMark.push(city);
        });
        
        return villesWithMark;
    */
   
    }

    planificationsWithMark(): any[] {
        return this.valuesWithSelectMark(this.planificationValues,this.planification); 
    }

}