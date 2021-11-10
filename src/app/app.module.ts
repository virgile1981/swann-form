import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemandeFlashComponent } from './demande-flash/demande-flash.component';
import { DemandePersonnelleComponent } from './demande-personnelle/demande-personnelle.component';
import { DemandePeintureComponent } from './demande-peinture/demande-peinture.component';
import { FormDirective } from './form.directive';
import { DemandeAutreComponent } from './demande-autre/demande-autre.component';
import { FileUploadComponent } from './utils/fileUpload.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DemandeComponent } from './demande/demande.component';

@NgModule({
  declarations: [
    AppComponent,
    DemandeFlashComponent,
    DemandePersonnelleComponent,
    DemandePeintureComponent,
    DemandeAutreComponent,
    FileUploadComponent,
    FormDirective,
    DemandeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: DemandeComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
