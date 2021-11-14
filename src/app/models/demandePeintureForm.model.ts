import { IForm } from "./form.model";

export interface IDemandePeintureForm extends IForm {
    descriptif?: string,
    imageReference?: string,
    imageReferenceContentType?: string,
    technique?: string,
    format?: string,
    budget?: string,
    planification?: string
}

export class DemandePeintureForm implements IDemandePeintureForm {
   
    constructor(
        public descriptif?: string,
        public imageReference?: string,
        public imageReferenceContentType?: string,
        public technique?: string,
        public format?: string,
        public budget?: string,
        public planification?: string){}
    
}