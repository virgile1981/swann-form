import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getDemandeForm } from '../demande/demande.form';
import { FormFooterComponent } from '../layouts/form-footer/form-footer.component';
import { FileUploadComponent } from '../shared/fileUpload.component';

import { DemandePeintureComponent } from './demande-peinture.component';

describe('DemandePeintureComponent', () => {
  let component: DemandePeintureComponent;
  let fixture: ComponentFixture<DemandePeintureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ DemandePeintureComponent, FormFooterComponent,FileUploadComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandePeintureComponent);
    component = fixture.componentInstance;
    component.form = getDemandeForm();
    component.form.setValue({nom: "virgile", email:"bourse.virgile@gmail.com",majeur:"oui",demande:"flash"});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the peinture form ', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toMatch("Réaliser un dessin ou une peinture");
  })
});
