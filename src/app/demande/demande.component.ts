import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DemandeAutreComponent } from '../demande-autre/demande-autre.component';
import { DemandeFlashComponent } from '../demande-flash/demande-flash.component';
import { DemandePeintureComponent } from '../demande-peinture/demande-peinture.component';
import { DemandePersonnelleComponent } from '../demande-personnelle/demande-personnelle.component';
import { FormDirective } from '../form.directive';
import { IDemandeComponent } from './demande.interface.component';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent implements OnInit,IDemandeComponent {

@ViewChild(FormDirective, {static: true}) demandeForm!: FormDirective;
@ViewChild("autreAgeButton") autreAgeButton: ElementRef;
@ViewChild("autreDemandeButton") autreDemandeButton: ElementRef;
@ViewChild("initForm") initForm: ElementRef;

public form = this.fb.group({
  nom: ['',Validators.required],
  email: ['',[Validators.required,Validators.email]],
  majeur: [null,[Validators.required]],
  demande: [null,Validators.required]
  });

  isInitFormVisible: boolean = true;

  constructor(private fb: FormBuilder, private componentFactoryResolver: ComponentFactoryResolver) {}
  ngOnInit(): void {
     //this.form.setValue({nom: "virgile", email:"bourse.virgile@gmail.com",majeur:"oui",demande:"personnelle"});
     //this.save();
  }

  /**
   * 
   * @returns retourne vrai si le radiobutton "Autre" est selectionné pour le type de demande
   */
  public autreDemandeButtonSelected() : boolean {
    if(this.autreDemandeButton) {
      return this.autreDemandeButton.nativeElement.checked
    }
    return false;
  }

  /**
   * 
   * @returns retourne vrai si le radiobutton "Autre" est selectionné pour l'age
   */
  public mineurButtonSelected(): boolean {
    if(this.autreAgeButton) {
      return this.autreAgeButton.nativeElement.checked;
    }
    return false;
  }


  save() {
    const viewContainerRef = this.demandeForm.viewContainerRef;
    viewContainerRef.clear();
    let demandeComponent = null;
    this.isInitFormVisible = false;
   switch(this.form.get("demande").value) {
     case "personnelle" :
        demandeComponent = this.componentFactoryResolver.resolveComponentFactory(DemandePersonnelleComponent);
        break;
     case "flash" :
        demandeComponent = this.componentFactoryResolver.resolveComponentFactory(DemandeFlashComponent);
        break;
     case "peinture" :
        demandeComponent = this.componentFactoryResolver.resolveComponentFactory(DemandePeintureComponent);
        break;
      default:
        demandeComponent = this.componentFactoryResolver.resolveComponentFactory(DemandeAutreComponent);
        break;
   }

    const componentRef = viewContainerRef.createComponent<DemandeComponent>(demandeComponent);
    componentRef.instance.form = this.form;
  }

}
