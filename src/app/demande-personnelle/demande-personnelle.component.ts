import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DemandeComponent } from '../demande.component';

@Component({
  selector: 'app-demande-personnelle',
  templateUrl: './demande-personnelle.component.html',
  styleUrls: ['./demande-personnelle.component.scss']
})
export class DemandePersonnelleComponent implements DemandeComponent {

  form: FormGroup;

  ngOnInit(): void {
  }

}
