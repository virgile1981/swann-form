import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export function getDemandeForm(): FormGroup {
    return new FormBuilder().group({
    nom: ['',Validators.required],
    email: ['',[Validators.required,Validators.email]],
    majeur: [null,[Validators.required]],
    demande: [null,Validators.required]
    });
}