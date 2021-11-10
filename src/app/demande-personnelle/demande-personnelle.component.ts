import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeComponent } from '../demande.component';
import { FormService } from '../services/form.service';
import { DemandePersonnelleForm, IDemandePersonnelleForm } from '../models/demandeForm.model';
import { DataUtils, FileLoadError } from '../services/data-utils.service';

@Component({
  selector: 'app-demande-personnelle',
  templateUrl: './demande-personnelle.component.html',
  styleUrls: ['./demande-personnelle.component.scss']
})
export class DemandePersonnelleComponent implements DemandeComponent {

  villes: string[] = ["Paris","Toulouse","Nantes","Brétignolles-sur-Mer"];
  form: FormGroup;
  progress: number = 0;

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

  uploadImageEmplacement(event) {
    this.dataUtils.loadFileToForm(event, this.demandeForm, 'imageEmplacement', true).subscribe({
      error: (err: FileLoadError) =>
        console.error('error.file.' + err.key),
    });
    /*
    const file = (event.target as HTMLInputElement).files[0];
    this.demandeForm.patchValue({
      imageEmplacement: file
    });
  this.demandeForm.get('imageEmplacement').updateValueAndValidity()*/
}

  uploadImageInspiration(event) {
    this.dataUtils.loadFileToForm(event, this.demandeForm, 'imageInspiration', true).subscribe({
      error: (err: FileLoadError) =>
        console.error('error.file.' + err.key),
    });
    /** const file = (event.target as HTMLInputElement).files[0];
    this.demandeForm.patchValue({
      imageEmplacement: file
    });
    this.demandeForm.get('imageEmplacement').updateValueAndValidity() */
  }

  save(){
    this.formService.save(this.createFromForm()).subscribe((event: HttpEvent<any>) => {
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

  protected createFromForm(): IDemandePersonnelleForm {
    return {
      ...new DemandePersonnelleForm(),
      descriptif: this.demandeForm.get(['descriptif'])!.value,
      ville: this.demandeForm.get(['ville'])!.value,
      idee: this.demandeForm.get(['idee'])!.value,
      imageInspiration: this.demandeForm.get(['imageInspiration'])!.value,
      imageEmplacement: this.demandeForm.get(['imageEmplacement'])!.value,
      taille: this.demandeForm.get(['taille'])!.value,
      budget: this.demandeForm.get(['budget'])!.value,
      planification: this.demandeForm.get(['planification'])!.value,
    };
  }


}