"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandeFlashDTO = void 0;
const demande_dto_1 = require("./demande.dto");
class DemandeFlashDTO extends demande_dto_1.DemandeDTO {
    constructor() {
        super(...arguments);
        this.villeValues = ["Paris", "Toulouse", "Nantes", "Brétignolles-sur-Mer"];
        this.planificationValues = ["Le plus tôt possible", "Le mois prochain", "L'année prochaine"];
        this.imagesFlashThumbnail = [];
        this.imagesEmplacementThumbnail = [];
    }
    isAutreVille() {
        if (this.ville != null) {
            return !this.villeValues.includes(this.ville);
        }
        return false;
    }
    isAutrePlanification() {
        if (this.planification != null) {
            return !this.planificationValues.includes(this.planification);
        }
        return false;
    }
    isTailleDeLArtiste() {
        return this.taille === "tailleDeLArtiste";
    }
    inject(demandeFlashDTO) {
        super.inject(demandeFlashDTO);
        this.descriptif = demandeFlashDTO.descriptif;
        this.ville = demandeFlashDTO.ville;
        this.modifications = demandeFlashDTO.modifications;
        this.imagesFlash = demandeFlashDTO.imagesFlash;
        this.imagesEmplacement = demandeFlashDTO.imagesEmplacement;
        this.taille = demandeFlashDTO.taille;
        this.planification = demandeFlashDTO.planification;
        return this;
    }
    villesWithMark() {
        return this.valuesWithSelectMark(this.villeValues, this.ville);
    }
    planificationsWithMark() {
        return this.valuesWithSelectMark(this.planificationValues, this.planification);
    }
}
exports.DemandeFlashDTO = DemandeFlashDTO;
