import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeComponent } from '../demande.component';

@Component({
  selector: 'app-demande-personnelle',
  templateUrl: './demande-personnelle.component.html',
  styleUrls: ['./demande-personnelle.component.scss']
})
export class DemandePersonnelleComponent implements DemandeComponent {

  villes: string[] = ["Paris","Toulouse","Nantes","Brétignolles-sur-Mer"];
  form: FormGroup;
 
  @ViewChild("autreVilleButton") autreVilleButton: ElementRef;
  @ViewChild("autreBudgetButton") autreBudgetButton: ElementRef;
  @ViewChild("autrePlanificationButton") autrePlanificationButton: ElementRef;



  demandeForm = this.fb.group({
    descriptif: '',
    ville: [null,Validators.required],
    idee: ['',Validators.required],
    imageInspiration: [null,Validators.required],
    imageEmplacement: [null,Validators.required],
    taille: ['',Validators.required],
    budget: [null,Validators.required],
    planification: [null,Validators.required]
  });


 constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
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

save(){}
}