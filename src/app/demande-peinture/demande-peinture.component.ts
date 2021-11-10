import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDemandeComponent } from '../demande/demande.interface.component';

@Component({
  selector: 'app-demande-peinture',
  templateUrl: './demande-peinture.component.html',
  styleUrls: ['./demande-peinture.component.scss']
})
export class DemandePeintureComponent implements IDemandeComponent {

  form: FormGroup;

  ngOnInit(): void {
  }

}
