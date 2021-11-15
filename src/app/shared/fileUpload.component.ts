import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
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
   <input type="file">
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
  
    @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
      const file = event && event.item(0);
      this.dataUtils.toBase64(file, (base64Data: string) => {
        this.onChange({
            'lastMod'    : file.lastModified,
            'buffer'     : base64Data,
            'name'       : file.name,
            'size'       : file.size,
            'type'       : file.type
        } );
    });
      this.file = file;
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
}