import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandePersonnelleComponent } from './demande-personnelle.component';

describe('DemandePersonnelleComponent', () => {
  let component: DemandePersonnelleComponent;
  let fixture: ComponentFixture<DemandePersonnelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandePersonnelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandePersonnelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
