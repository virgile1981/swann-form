import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DemandeComponent } from '../demande.component';

@Component({
  selector: 'app-demande-autre',
  templateUrl: './demande-autre.component.html',
  styleUrls: ['./demande-autre.component.scss']
})
export class DemandeAutreComponent implements DemandeComponent {

  form: FormGroup;

  ngOnInit(): void {
  }

}
