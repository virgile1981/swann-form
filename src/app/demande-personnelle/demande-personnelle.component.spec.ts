import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getDemandeForm } from '../demande/demande.form';
import { FormFooterComponent } from '../layouts/form-footer/form-footer.component';
import { FileUploadComponent } from '../shared/fileUpload.component';

import { DemandePersonnelleComponent } from './demande-personnelle.component';

describe('DemandePersonnelleComponent', () => {
  let component: DemandePersonnelleComponent;
  let fixture: ComponentFixture<DemandePersonnelleComponent>;

  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ DemandePersonnelleComponent, FormFooterComponent,FileUploadComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandePersonnelleComponent);
    component = fixture.componentInstance;
    component.form = getDemandeForm();
    component.form.setValue({nom: "virgile", email:"bourse.virgile@gmail.com",majeur:"oui",demande:"flash"});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should display the personnelle form ', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toMatch("Commander un tatouage personnel");
  })
});
