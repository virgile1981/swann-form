import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DemandeComponent } from '../demande.component';

@Component({
  selector: 'app-demande-peinture',
  templateUrl: './demande-peinture.component.html',
  styleUrls: ['./demande-peinture.component.scss']
})
export class DemandePeintureComponent implements DemandeComponent {

  form: FormGroup;

  ngOnInit(): void {
  }

}
