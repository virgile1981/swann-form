import { IForm } from "./form.model";

export interface IDemandeFlashForm extends IForm {
    descriptif?: string,
    ville?: string,
    modifications?: string,
    imagesFlash?: string,
    imagesEmplacement?: string,
    taille?: string,
    planification?: string
}

export class DemandeFlashForm implements IDemandeFlashForm {
   
    constructor(
        public descriptif?: string,
        public ville?: string,
        public modifications?: string,
        public imagesFlash?: string,
        public imagesEmplacement?: string, 
        public taille?: string,
        public planification?: string){}
}