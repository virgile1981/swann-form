import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  form = this.fb.group({
    nom: ['',Validators.required],
    email: ['',[Validators.required,Validators.email]],
    majeur: ['',Validators.required],
    });

  constructor(private fb: FormBuilder) {}

  save() {
  }
}
