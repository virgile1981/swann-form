import { IForm } from "./form.model";

export interface IDemandePersonnelleForm extends IForm {
    descriptif?: string,
    ville?: string,
    idee?: string,
    imagesInspiration?: string,
    imagesEmplacement?: string,
    taille?: string,
    budget?: string,
    planification?: string
}

export class DemandePersonnelleForm implements IDemandePersonnelleForm {
   
    constructor(
        public descriptif?: string,
        public ville?: string,
        public idee?: string,
        public imagesInspiration?: string,
        public imagesEmplacement?: string,
        public taille?: string,
        public budget?: string,
        public planification?: string){}
    
}