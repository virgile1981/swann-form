"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandeDTO = void 0;
class DemandeDTO {
    isMajeur() {
        return this.majeur === "oui";
    }
    isDemandePersonnelle() {
        return this.demande === "personnelle";
    }
    isDemandeFlash() {
        return this.demande === "flash";
    }
    isDemandePeinture() {
        return this.demande === "peinture";
    }
    isDemandeAutre() {
        return !this.isDemandePersonnelle() && !this.isDemandeFlash() && !this.isDemandePeinture();
    }
    inject(demandeDTO) {
        this.nom = demandeDTO.nom;
        this.email = demandeDTO.email;
        this.majeur = demandeDTO.majeur;
        this.demande = demandeDTO.demande;
        return this;
    }
    valuesWithSelectMark(values, value) {
        const valuesWithMark = new Array();
        values.forEach(elt => {
            console.log(elt);
            var map = { value: elt, isSelected: value === elt };
            valuesWithMark.push(map);
        });
        console.log(JSON.stringify(valuesWithMark));
        return valuesWithMark;
    }
}
exports.DemandeDTO = DemandeDTO;
