import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  ReactiveFormsModule } from '@angular/forms';
import { FormFooterComponent } from '../layouts/form-footer/form-footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DemandeFlashComponent } from './demande-flash.component';
import { FileUploadComponent } from '../shared/fileUpload.component';
import { getDemandeForm } from '../demande/demande.form';

describe('DemandeFlashComponent', () => {
  let component: DemandeFlashComponent;
  let fixture: ComponentFixture<DemandeFlashComponent>;
  let h2: any;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ DemandeFlashComponent,  FormFooterComponent,FileUploadComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeFlashComponent);
    component = fixture.componentInstance;
    component.form = getDemandeForm();
    component.form.setValue({nom: "virgile", email:"bourse.virgile@gmail.com",majeur:"oui",demande:"flash"});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the flash form ', () => {
    h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toMatch("Réserver un flash");
  })
});
