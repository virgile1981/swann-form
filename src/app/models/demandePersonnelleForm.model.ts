import { IForm } from "./form.model";

export interface IDemandePersonnelleForm extends IForm {
    descriptif?: string,
    ville?: string,
    idee?: string,
    imageInspiration?: string,
    imageInspirationContentType?: string,
    imageEmplacement?: string,
    imageEmplacementContentType?: string,
    taille?: string,
    budget?: string,
    planification?: string
}

export class DemandePersonnelleForm implements IDemandePersonnelleForm {
   
    constructor(
        public descriptif?: string,
        public ville?: string,
        public idee?: string,
        public imageInspiration?: string,
        public imageInspirationContentType?: string,
        public imageEmplacement?: string,
        public imageEmplacementContentType?: string, 
        public taille?: string,
        public budget?: string,
        public planification?: string){}
    
}