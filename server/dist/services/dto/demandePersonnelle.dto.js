"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandePersonnelleDTO = void 0;
const demande_dto_1 = require("./demande.dto");
class DemandePersonnelleDTO extends demande_dto_1.DemandeDTO {
    constructor() {
        super(...arguments);
        this.villeValues = ["Paris", "Toulouse", "Nantes", "Brétignolles-sur-Mer"];
        this.planificationValues = ["Le plus tôt possible", "Le mois prochain", "L'année prochaine"];
        this.imagesInspirationThumbnail = [];
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
    isBudgetIndetermine() {
        return this.budget === "pas déterminé";
    }
    inject(demandePersonnelleDTO) {
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
    villesWithMark() {
        return this.valuesWithSelectMark(this.villeValues, this.ville);
    }
    planificationsWithMark() {
        return this.valuesWithSelectMark(this.planificationValues, this.planification);
    }
}
exports.DemandePersonnelleDTO = DemandePersonnelleDTO;
