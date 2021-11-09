import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemandeFlashComponent } from './demande-flash/demande-flash.component';
import { DemandePersonnelleComponent } from './demande-personnelle/demande-personnelle.component';
import { DemandePeintureComponent } from './demande-peinture/demande-peinture.component';
import { FormDirective } from './form.directive';

@NgModule({
  declarations: [
    AppComponent,
    DemandeFlashComponent,
    DemandePersonnelleComponent,
    DemandePeintureComponent,
    FormDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
