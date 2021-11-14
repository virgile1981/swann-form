import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';
import { IDemandeComponent } from '../demande/demande.interface.component';
import { DemandeFlashForm, IDemandeFlashForm } from '../models/demandeFlashForm.model';
import { DataUtils, FileLoadError } from '../services/data-utils.service';

@Component({
  selector: 'app-demande-flash',
  templateUrl: './demande-flash.component.html',
  styleUrls: ['./demande-flash.component.scss']
})
export class DemandeFlashComponent implements IDemandeComponent {
 
  
  villes: string[] = ["Paris","Toulouse","Nantes","Brétignolles-sur-Mer"];
  form: FormGroup;
  progress: number = 0;
  isFormSent = false;

  @ViewChild("autreVilleButton") autreVilleButton: ElementRef;
  @ViewChild("autreTailleButton") autreTailleButton: ElementRef;
  @ViewChild("autrePlanificationButton") autrePlanificationButton: ElementRef;

  demandeForm = this.fb.group({
    descriptif: '',
    ville: [null,Validators.required],
    modifications: ['',Validators.required],
    imageFlash: [null,Validators.required],
    imageFlashContentType: [null,Validators.required],
    imageEmplacement: [null,Validators.required],
    imageEmplacementContentType: [null,Validators.required],
    taille: [null,Validators.required],
    budget: [null,Validators.required],
    planification: [null,Validators.required]
  });

  constructor(private fb: FormBuilder,private formService: FormService,protected dataUtils: DataUtils) {}

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
  autreTailleButtonSelected(): boolean {
    if(this.autreTailleButton != null) {
      return this.autreTailleButton.nativeElement.checked;
    }
    return false;
  }

  autrePlanificationButtonSelected(): boolean {
    if(this.autrePlanificationButton != null) {
      return this.autrePlanificationButton.nativeElement.checked;
    }
    return false;
  }

  uploadImageEmplacement(event) {
    this.dataUtils.loadFileToForm(event, this.demandeForm, 'imageEmplacement', true).subscribe({
      error: (err: FileLoadError) =>
        console.error('error.file.' + err.key),
    });
}

  uploadImageFlash(event) {
    this.dataUtils.loadFileToForm(event, this.demandeForm, 'imageFlash', true).subscribe({
      error: (err: FileLoadError) =>
        console.error('error.file.' + err.key),
    });
  }

  save(){
    this.formService.save(this.createFromForm()).subscribe((event: HttpEvent<any>) => {
      this.isFormSent = true;
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);

      }
    });
  }

  protected createFromForm(): IDemandeFlashForm {
    
    return {
      ...new DemandeFlashForm(),
      nom: this.form.get(['nom'])!.value,
      email: this.form.get(['email'])!.value,
      majeur: this.form.get(['majeur'])!.value,
      demande: this.form.get(['demande'])!.value,
      
      descriptif: this.demandeForm.get(['descriptif'])!.value,
      ville: this.demandeForm.get(['ville'])!.value,
      modifications: this.demandeForm.get(['modifications'])!.value,
      imageFlash: this.demandeForm.get(['imageFlash'])!.value,
      imageFlashContentType: this.demandeForm.get(['imageFlashContentType'])!.value,
      imageEmplacement: this.demandeForm.get(['imageEmplacement'])!.value,
      imageEmplacementContentType: this.demandeForm.get(['imageEmplacementContentType'])!.value,
      taille: this.demandeForm.get(['taille'])!.value,
      budget: this.demandeForm.get(['budget'])!.value,
      planification: this.demandeForm.get(['planification'])!.value,
    };
  }

}
