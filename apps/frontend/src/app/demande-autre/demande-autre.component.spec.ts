import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getDemandeForm } from '../demande/demande.form';
import { FormFooterComponent } from '../layouts/form-footer/form-footer.component';
import { FileUploadComponent } from '../shared/fileUpload.component';

import { DemandeAutreComponent } from './demande-autre.component';

describe('DemandeAutreComponent', () => {
  let component: DemandeAutreComponent;
  let fixture: ComponentFixture<DemandeAutreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ DemandeAutreComponent, FormFooterComponent,FileUploadComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeAutreComponent);
    component = fixture.componentInstance;
    component.form = getDemandeForm();
    component.form.setValue({nom: "virgile", email:"bourse.virgile@gmail.com",majeur:"oui",demande:"flash"});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the autre demande form ', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toMatch("Autre");
  })
});
