export interface IForm {
    nom?: string,
    email?: string,
    majeur?: string,
    demande?: string
}

export class Form implements IForm {
    constructor(
        public nom?: string,
        public email?: string,
        public majeur?: string,
        public demande?: string
    ){}
}