import { DemandeDTO } from "./demande.dto";
import { FileDTO } from "./file.dto";



export class DemandePeintureDTO extends DemandeDTO{
    techniqueValues: string[] = [
        "Digitale - couleur ou noir et blanc",
        "Mines graphites, fusain - noir et blanc (sur papier blanc ou mi-teinte)",
        "Encre de chine - noir et blanc (sur papier blanc)",
        "Peinture acrylique, à l’huile - couleur ou noir et blanc (sur toile, planche en bois, ou papier)",
        "Je ne sais pas, à voir selon les conseils de l’artiste"
      ];
    formatValues: string[] = [ "A4","A3","A2"];

    descriptif?: string;
    imagesReference?:FileDTO[];
    imagesReferenceThumbnail? :FileDTO[] = [];
    technique?: string;
    format?: string;
    budget?: string;
    planification?: string;

    isAutreFormat(): boolean {
        if(this.format != null) { 
            return !this.formatValues.includes(this.format);
        }
        return false;
    }

    isPlanificationIndetermine(): boolean {
        if(this.planification != null) {
            return this.planification === "Pas déterminé"
        }
        return false;
    }

    isBudgetIndetermine(): boolean {
        if(this.budget != null) {
        return this.budget === "Pas déterminé";
        }
        return false;
    }

    inject(demandePeintureDTO: DemandePeintureDTO): DemandePeintureDTO {
        super.inject(demandePeintureDTO);        
        this.descriptif = demandePeintureDTO.descriptif;
        this.format = demandePeintureDTO.format;
        this.technique = demandePeintureDTO.technique;
        this.imagesReference = demandePeintureDTO.imagesReference;
        this.budget = demandePeintureDTO.budget;
        this.planification = demandePeintureDTO.planification;
        return this;       
    }

    techniquesWithMark(): any[] {
        return this.valuesWithSelectMark(this.techniqueValues,this.technique);
    }

    formatsWithMark(): any[] {
        return this.valuesWithSelectMark(this.formatValues,this.format); 
    }

}