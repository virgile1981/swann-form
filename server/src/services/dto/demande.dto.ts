export class DemandeDTO {
    nom?: string;
    email?: string;
    majeur?: string;
    demande?: string;

    isMajeur() : boolean {
        return this.majeur ==="oui";
    }

    isDemandePersonnelle(): boolean {
        return this.demande === "personnelle";
    }

    isDemandeFlash(): boolean {
        return this.demande === "flash";
    }

    isDemandePeinture(): boolean {
        return this.demande === "peinture";
    }

    isDemandeAutre(): boolean {
        return !this.isDemandePersonnelle() && !this.isDemandeFlash() && !this.isDemandePeinture();
    }
 
    inject(demandeDTO: DemandeDTO): DemandeDTO {
        this.nom = demandeDTO.nom;
        this.email = demandeDTO.email;
        this.majeur = demandeDTO.majeur;
        this.demande = demandeDTO.demande;
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
}