import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    // this.form.setValue({nom: "virgile", email:"bourse.virgile@gmail.com",majeur:"oui",demande:"personnelle"});
      //this.save();
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

  injectDemandeComponent(component: any) {
    const viewContainerRef = this.demandeForm.viewContainerRef;
    viewContainerRef.clear();
    const demandeComponent = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = viewContainerRef.createComponent<any>(demandeComponent);
    componentRef.instance.form = this.form;
  }

  save() {
    
   this.isInitFormVisible = false;
   switch(this.form.get("demande").value) {
     case "personnelle" :
        import('../demande-personnelle/demande-personnelle.component').then (({DemandePersonnelleComponent}) => {
          this.injectDemandeComponent(DemandePersonnelleComponent);
        })
        break;
     case "flash" :
        import('../demande-flash/demande-flash.component').then (({DemandeFlashComponent}) => {
          this.injectDemandeComponent(DemandeFlashComponent);
        })
        break;
     case "peinture" :
        import('../demande-peinture/demande-peinture.component').then (({DemandePeintureComponent}) => {
          this.injectDemandeComponent(DemandePeintureComponent);
        })
        break;
      default:
        import('../demande-autre/demande-autre.component').then (({DemandeAutreComponent}) => {
          this.injectDemandeComponent(DemandeAutreComponent);
        })
        break;
   }
  }

}
