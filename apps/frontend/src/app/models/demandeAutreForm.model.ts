import { IForm } from "./form.model";

export interface IDemandeAutreForm extends IForm {
    descriptif?: string
}

export class DemandeAutreForm implements IDemandeAutreForm {
   
    constructor(public descriptif?: string){}
    
}