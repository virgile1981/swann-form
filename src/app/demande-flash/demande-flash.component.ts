import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DemandeComponent } from '../demande.component';

@Component({
  selector: 'app-demande-flash',
  templateUrl: './demande-flash.component.html',
  styleUrls: ['./demande-flash.component.scss']
})
export class DemandeFlashComponent implements DemandeComponent {
  form: FormGroup;

  ngOnInit(): void {
  }

}
