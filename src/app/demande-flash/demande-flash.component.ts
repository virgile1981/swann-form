import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDemandeComponent } from '../demande/demande.interface.component';

@Component({
  selector: 'app-demande-flash',
  templateUrl: './demande-flash.component.html',
  styleUrls: ['./demande-flash.component.scss']
})
export class DemandeFlashComponent implements IDemandeComponent {
  form: FormGroup;

  ngOnInit(): void {
  }

}
