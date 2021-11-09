import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[demandeForm]',
})
export class FormDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}