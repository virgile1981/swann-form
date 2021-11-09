import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandePeintureComponent } from './demande-peinture.component';

describe('DemandePeintureComponent', () => {
  let component: DemandePeintureComponent;
  let fixture: ComponentFixture<DemandePeintureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandePeintureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandePeintureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
