import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractDemandeComponent } from '../demande/abstractDemande.component';
import { DemandePeintureForm, IDemandePeintureForm } from '../models/demandePeintureForm.model';
import { DataUtils, FileLoadError } from '../services/data-utils.service';
import { FormService } from '../services/form.service';
import { filesCapacityLimited } from '../shared/filesCapacityLimited.directive';

@Component({
  selector: 'app-demande-peinture',
  templateUrl: './demande-peinture.component.html',
  styleUrls: ['./demande-peinture.component.scss']
})
export class DemandePeintureComponent  extends AbstractDemandeComponent {
  techniques: string[] = [
          "Digitale - couleur ou noir et blanc",
          "Mines graphites, fusain - noir et blanc (sur papier blanc ou mi-teinte)",
          "Encre de chine - noir et blanc (sur papier blanc)",
          "Peinture acrylique, à l’huile - couleur ou noir et blanc (sur toile, planche en bois, ou papier)",
          "Je ne sais pas, à voir selon les conseils de l’artiste"
        ];
  formats: string[] = [ "A4","A3","A2"];
  form: FormGroup;
  progress: number = 0;
  isFormSent = false;

  @ViewChild("autreFormatButton") autreFormatButton: ElementRef;
  @ViewChild("autreBudgetButton") autreBudgetButton: ElementRef;
  @ViewChild("autrePlanificationButton") autrePlanificationButton: ElementRef;

  demandeForm = this.fb.group({
    descriptif: '',
    imagesReference: [null,Validators.required],
    technique: ['',Validators.required],
    format: [null,Validators.required],
    budget: [null,Validators.required],
    planification: [null,Validators.required]
  });

  constructor(private fb: FormBuilder,formService: FormService,protected dataUtils: DataUtils) {
    super(formService);
    this.demandeForm.setValidators(filesCapacityLimited());
  }

  ngOnInit(): void {
    //On joint au premier formulaire le formulaire de demande personnelle que l'utilisateur s'apprête à remplir
    this.form.addControl("demandeForm",this.demandeForm);
  }

  /**
   * 
   * @returns retourne vrai si le radio bouton "Autre" est selectionné pour permettre d'activer le champ de saisie autre ville
   */
  autreFormatButtonSelected() : boolean {
    if(this.autreFormatButton != null) {
      return this.autreFormatButton.nativeElement.checked;
    } 
    return false;
  }

  /**
   * 
   * @returns retourne vrai si le radio bouton "Autre" est selectionné pour permettre d'activer le champ de saisie autre buget
   */
  autreBudgetButtonSelected(): boolean {
    if(this.autreBudgetButton != null) {
      return this.autreBudgetButton.nativeElement.checked;
    }
    return false;
  }

  autrePlanificationButtonSelected(): boolean {
    if(this.autrePlanificationButton != null) {
      return this.autrePlanificationButton.nativeElement.checked;
    }
    return false;
  }

  uploadImageReference(event) {
    this.dataUtils.loadFileToForm(event, this.demandeForm, 'imageReference', true).subscribe({
      error: (err: FileLoadError) =>
        console.error('error.file.' + err.key),
    });
}

protected createFromForm(): IDemandePeintureForm {
  
  return {
    ...new DemandePeintureForm(),
    nom: this.form.get(['nom'])!.value,
    email: this.form.get(['email'])!.value,
    majeur: this.form.get(['majeur'])!.value,
    demande: this.form.get(['demande'])!.value,
    
    descriptif: this.demandeForm.get(['descriptif'])!.value,
    imagesReference: this.demandeForm.get(['imagesReference'])!.value,
    technique: this.demandeForm.get(['technique'])!.value,
    format: this.demandeForm.get(['format'])!.value,   
    budget: this.demandeForm.get(['budget'])!.value,
    planification: this.demandeForm.get(['planification'])!.value,
  };
}

}
