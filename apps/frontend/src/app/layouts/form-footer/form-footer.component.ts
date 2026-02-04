import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss']
})
export class FormFooterComponent implements OnInit {
  @Input()
  errorServer: boolean;
  @Input()
  progress: number;
  @Input()
  isFormSent: boolean;
  @Input()
  isEmailSent: boolean;

  constructor() { }

  ngOnInit(): void {

  }

}
