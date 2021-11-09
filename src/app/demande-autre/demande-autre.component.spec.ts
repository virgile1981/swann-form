import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAutreComponent } from './demande-autre.component';

describe('DemandeAutreComponent', () => {
  let component: DemandeAutreComponent;
  let fixture: ComponentFixture<DemandeAutreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeAutreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeAutreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
