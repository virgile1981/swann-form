import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';
import { DemandePersonnelleForm, IDemandePersonnelleForm } from '../models/demandePersonnelleForm.model';
import { DataUtils, FileLoadError } from '../services/data-utils.service';
import { AbstractDemandeComponent } from '../demande/abstractDemande.component';
import { filesCapacityLimited } from '../shared/filesCapacityLimited.directive';

@Component({
  selector: 'app-demande-personnelle',
  templateUrl: './demande-personnelle.component.html',
  styleUrls: ['./demande-personnelle.component.scss']
})
export class DemandePersonnelleComponent  extends AbstractDemandeComponent  {

  villes: string[] = ["Paris","Toulouse","Nantes","Brétignolles-sur-Mer"];
  form: FormGroup;
  progress: number = 0;
  isFormSent = false;

  @ViewChild("autreVilleButton") autreVilleButton: ElementRef;
  @ViewChild("autreBudgetButton") autreBudgetButton: ElementRef;
  @ViewChild("autrePlanificationButton") autrePlanificationButton: ElementRef;

  demandeForm = this.fb.group({
    descriptif: '',
    ville: [null,Validators.required],
    idee: ['',Validators.required],
    imagesInspiration: [null,Validators.required],
    imagesEmplacement: [null,Validators.required],
    taille: ['',Validators.required],
    budget: [null,Validators.required],
    planification: [null,Validators.required]
  });


 constructor(private fb: FormBuilder, formService: FormService,protected dataUtils: DataUtils) {
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
  autreVilleButtonSelected() : boolean {
    if(this.autreVilleButton != null) {
      return this.autreVilleButton.nativeElement.checked;
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

  protected createFromForm(): IDemandePersonnelleForm {
    
    return {
      ...new DemandePersonnelleForm(),
      nom: this.form.get(['nom'])!.value,
      email: this.form.get(['email'])!.value,
      majeur: this.form.get(['majeur'])!.value,
      demande: this.form.get(['demande'])!.value,
      
      descriptif: this.demandeForm.get(['descriptif'])!.value,
      ville: this.demandeForm.get(['ville'])!.value,
      idee: this.demandeForm.get(['idee'])!.value,
      imagesInspiration: this.demandeForm.get(['imagesInspiration'])!.value,
      imagesEmplacement: this.demandeForm.get(['imagesEmplacement'])!.value,
      taille: this.demandeForm.get(['taille'])!.value,
      budget: this.demandeForm.get(['budget'])!.value,
      planification: this.demandeForm.get(['planification'])!.value,
    };
  }


}