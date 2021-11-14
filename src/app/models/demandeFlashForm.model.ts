import { IForm } from "./form.model";

export interface IDemandeFlashForm extends IForm {
    descriptif?: string,
    ville?: string,
    modifications?: string,
    imageFlash?: string,
    imageFlashContentType?: string,
    imageEmplacement?: string,
    imageEmplacementContentType?: string,
    taille?: string,
    budget?: string,
    planification?: string
}

export class DemandeFlashForm implements IDemandeFlashForm {
   
    constructor(
        public descriptif?: string,
        public ville?: string,
        public modifications?: string,
        public imageFlash?: string,
        public imageFlashContentType?: string,
        public imageEmplacement?: string,
        public imageEmplacementContentType?: string, 
        public taille?: string,
        public budget?: string,
        public planification?: string){}
    
}