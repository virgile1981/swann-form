import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { DataUtils } from "../services/data-utils.service";
import { FileUploadComponent } from "./fileUpload.component";



class MockDataUtils extends DataUtils {
 
  toBase64(file: File, callback: (base64Data: string)=> void) 
  {
    callback("balblabl");
  }
  
};



describe('FileUploadComponent', () => {
    let component: FileUploadComponent;
    let fixture: ComponentFixture<FileUploadComponent>;
    let fileInput: any;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ FileUploadComponent ],
        providers: [{provide: DataUtils, useClass: MockDataUtils}]
      })
      .compileComponents();
    });
  
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(FileUploadComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      fileInput = fixture.nativeElement.querySelector("input");
      component.registerOnChange(()=>{});

      const dataBase64 = "VEhJUyBJUyBUSEUgQU5TV0VSCg==";
      const arrayBuffer = Uint8Array.from(window.atob(dataBase64), c => c.charCodeAt(0));
      const file = new File([arrayBuffer], "image.jpeg", {type: 'image/jpeg'});
      let fileList = <FileList>{ item: (index: number)=> file, length:1 };
      component.emitFiles(fileList);   
      fixture.detectChanges();
    }));
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should add photo', fakeAsync(()  => {
      const dataBase64 = "VEhJUyBJUyBUSEUgQU5TV0VSCg==";
      const arrayBuffer = Uint8Array.from(window.atob(dataBase64), c => c.charCodeAt(0));
      const file = new File([arrayBuffer], "image.jpeg", {type: 'image/jpeg'});
      let fileList = <FileList>{ item: (index: number)=> file, length:1 };
      component.emitFiles(fileList);   
      fixture.detectChanges();

      expect(component.currentSize).toBe(19+19);
      const images = fixture.nativeElement.querySelectorAll('img');
      expect(images.length).toBe(2);
    }))

    it('should delete photo', fakeAsync(()=> {
      const button = fixture.nativeElement.querySelector('button');
      button.click();
      fixture.detectChanges();
      const images = fixture.nativeElement.querySelectorAll('img');
      expect(images.length).toBe(0);

    }))

    it('should clear input field after adding photo', fakeAsync(()=> {
      let input = fixture.nativeElement.querySelectorAll('input');
      input.value = "image.jpeg";

      const dataBase64 = "VEhJUyBJUyBUSEUgQU5TV0VSCg==";
      const arrayBuffer = Uint8Array.from(window.atob(dataBase64), c => c.charCodeAt(0));
      const file = new File([arrayBuffer], "image.jpeg", {type: 'image/jpeg'});
      let fileList = <FileList>{ item: (index: number)=> file, length:1 };
      component.emitFiles(fileList);   
      fixture.detectChanges();

      expect(input.value).toBeFalse;
    }))

  });