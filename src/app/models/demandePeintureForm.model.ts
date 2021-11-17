import { IForm } from "./form.model";

export interface IDemandePeintureForm extends IForm {
    descriptif?: string,
    imagesReference?: string,
    technique?: string,
    format?: string,
    budget?: string,
    planification?: string
}

export class DemandePeintureForm implements IDemandePeintureForm {
   
    constructor(
        public descriptif?: string,
        public imagesReference?: string,
        public technique?: string,
        public format?: string,
        public budget?: string,
        public planification?: string){}
    
}