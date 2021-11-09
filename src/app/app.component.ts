import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  @ViewChild("autreAgeButton") autreAgeButton: ElementRef;
  @ViewChild("autreDemandeButton") autreDemandeButton: ElementRef;

  form = this.fb.group({
    nom: ['',Validators.required],
    email: ['',[Validators.required,Validators.email]],
    majeur: [null,[Validators.required]],
    demande: [null,Validators.required]
    });

  constructor(private fb: FormBuilder) {}

  public handleChange() {
    if(this.form.get("majeur").value == "autre") {
      console.log("on arrive dans l'autre");
    } else {
      console.log("on est pas dans l'autre");
    }
    console.log(this.autreAgeButton.nativeElement.checked);
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
  }
}
