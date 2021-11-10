import { DemandeDTO } from "./demande.dto";

export class DemandePersonnelleDTO extends DemandeDTO{
    descriptif?: string;
    ville?: string;
    idee?: string;
    imageInspiration?: string;
    imageEmplacement?: string;
    taille?: string;
    budget?: string;
    planification?: string;
}