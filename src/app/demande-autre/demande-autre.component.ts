import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';
import { AbstractDemandeComponent } from '../demande/abstractDemande.component';
import { DemandeAutreForm } from '../models/demandeAutreForm.model';
import { IDemandeFlashForm, DemandeFlashForm } from '../models/demandeFlashForm.model';


@Component({
  selector: 'app-demande-autre',
  templateUrl: './demande-autre.component.html',
  styleUrls: ['./demande-autre.component.scss']
})
export class DemandeAutreComponent extends AbstractDemandeComponent {

  demandeForm = this.fb.group({
    descriptif: ['', Validators.required]
  });
  constructor(private fb: FormBuilder, formService: FormService) {
    super(formService);
  }

  ngOnInit(): void {
    //On joint au premier formulaire le formulaire de demande personnelle que l'utilisateur s'apprête à remplir
    this.form.addControl("demandeForm",this.demandeForm);
  }

  protected createFromForm(): IDemandeFlashForm {
    return {
      ...new DemandeAutreForm(),
      nom: this.form.get(['nom'])!.value,
      email: this.form.get(['email'])!.value,
      majeur: this.form.get(['majeur'])!.value,
      demande: this.form.get(['demande'])!.value,
      descriptif: this.demandeForm.get(['descriptif'])!.value
    };
  }
}
