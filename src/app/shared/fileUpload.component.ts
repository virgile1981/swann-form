import { Component, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Config } from '../config';
import { DataUtils } from '../services/data-utils.service';
export interface UploadFileInterface {
  
        lastMod   : string;
        buffer    : string;
        name      : string;
        size      : string;
        type      : string;

}
@Component({
  selector: 'app-file-upload',
  template: `
  <div class="row">
    <div *ngFor="let file of files" class="col justify-content-start" style="position: relative">
      <img style="position: relative"
      
        [src]="'data:' + file.type + ';base64,' + file.buffer"
        style="max-height: 100px"
        alt="vehicule image"
      />
      
        <button style="position: absolute; left:10px"
          type="button"
          (click)="clearInputImage(file)"
          class="btn btn-secondary btn-xs pull-right">
          x
        </button>
    </div>
  </div>
  <input type="file" accept="image/jpeg, image/png">
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }]
},
)
export class FileUploadComponent implements ControlValueAccessor {
    onChange: Function;
    public file: File | null = null;
    limitSize = Config.filetoupload.maxsize;
    currentSize = 0;
    showError = false;
    public files = [];


    @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
      const file = event && event.item(0);

        this.dataUtils.toBase64(file, (base64Data: string) => {
          const fichier = {
            'lastMod'    : file.lastModified,
            'buffer'     : base64Data,
            'name'       : file.name,
            'size'       : file.size,
            'type'       : file.type
        }
        this.files.push(fichier);
        this.currentSize += fichier.size;
        this.onChange( this.files);
      });
        
    }

    constructor( private host: ElementRef<HTMLInputElement>, private dataUtils: DataUtils ) {}
  
    writeValue( value: null ) {
      // clear file input
     // this.host.nativeElement.value = '';
     // this.file = null;
    }
  
    registerOnChange( fn: Function ) {
      this.onChange = fn;
    }
  
    registerOnTouched( fn: Function ) {
    }

    public clearInputImage(file) {
      this.files = this.files.filter( elt => elt.size !== file.size);
      this.onChange( this.files);
      this.currentSize -= file.size;
    }
}