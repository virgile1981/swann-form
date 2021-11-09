import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFlashComponent } from './demande-flash.component';

describe('DemandeFlashComponent', () => {
  let component: DemandeFlashComponent;
  let fixture: ComponentFixture<DemandeFlashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeFlashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeFlashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
