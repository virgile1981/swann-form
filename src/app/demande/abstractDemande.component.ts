import { HttpEvent, HttpEventType } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { IForm } from "../models/form.model";
import { FormService } from "../services/form.service";
import { IDemandeComponent } from "./demande.interface.component";

export class AbstractDemandeComponent implements IDemandeComponent{
    isFormSent = false;
    form: FormGroup;
    progress: number = 0;

    constructor(protected formService: FormService) {
        if (this.constructor === AbstractDemandeComponent) {
          throw new TypeError('Abstract class "AbstractDemandeComponent" cannot be instantiated directly');
        }
    }
    
    save(){
        this.formService.save(this.createFromForm()).subscribe((event: HttpEvent<any>) => {
          this.isFormSent = true;
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log('User successfully created!', event.body);
              setTimeout(() => {
                this.progress = 0;
              }, 1500);
          }
        });
      }
    
      protected createFromForm(): IForm {
        throw new Error('You must implement this function');
      }
}