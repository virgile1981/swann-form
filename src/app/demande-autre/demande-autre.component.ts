import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDemandeComponent } from '../demande/demande.interface.component';

@Component({
  selector: 'app-demande-autre',
  templateUrl: './demande-autre.component.html',
  styleUrls: ['./demande-autre.component.scss']
})
export class DemandeAutreComponent implements IDemandeComponent {

  form: FormGroup;

  ngOnInit(): void {
  }

}
