"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandePeintureDTO = void 0;
const demande_dto_1 = require("./demande.dto");
class DemandePeintureDTO extends demande_dto_1.DemandeDTO {
    constructor() {
        super(...arguments);
        this.techniqueValues = [
            "Digitale - couleur ou noir et blanc",
            "Mines graphites, fusain - noir et blanc (sur papier blanc ou mi-teinte)",
            "Encre de chine - noir et blanc (sur papier blanc)",
            "Peinture acrylique, à l’huile - couleur ou noir et blanc (sur toile, planche en bois, ou papier)",
            "Je ne sais pas, à voir selon les conseils de l’artiste"
        ];
        this.formatValues = ["A4", "A3", "A2"];
    }
    isAutreFormat() {
        if (this.format != null) {
            return !this.formatValues.includes(this.format);
        }
        return false;
    }
    isPlanificationIndetermine() {
        if (this.planification != null) {
            return this.planification === "Pas déterminé";
        }
        return false;
    }
    isBudgetIndetermine() {
        if (this.budget != null) {
            return this.budget === "Pas déterminé";
        }
        return false;
    }
    inject(demandePeintureDTO) {
        super.inject(demandePeintureDTO);
        this.descriptif = demandePeintureDTO.descriptif;
        this.format = demandePeintureDTO.format;
        this.technique = demandePeintureDTO.technique;
        this.imagesReference = demandePeintureDTO.imagesReference;
        this.budget = demandePeintureDTO.budget;
        this.planification = demandePeintureDTO.planification;
        return this;
    }
    techniquesWithMark() {
        return this.valuesWithSelectMark(this.techniqueValues, this.technique);
    }
    formatsWithMark() {
        return this.valuesWithSelectMark(this.formatValues, this.format);
    }
}
exports.DemandePeintureDTO = DemandePeintureDTO;
