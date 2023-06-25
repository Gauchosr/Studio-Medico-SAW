import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MedicoAuthComponent } from './medico-auth/medico-auth.component';
import { PazienteAuthComponent } from './paziente-auth/paziente-auth.component';
import { RegistrazioneMComponent } from './registrazione-m/registrazione-m.component';
import { RegistrazionePComponent } from './registrazione-p/registrazione-p.component';
import { AccessoMComponent } from './accesso-m/accesso-m.component';
import { AccessoPComponent } from './accesso-p/accesso-p.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';




import { MatInputModule } from '@angular/material/input';
import { DashboardMComponent } from './dashboard-m/dashboard-m.component';
import { DashboardPComponent } from './dashboard-p/dashboard-p.component';
import { IscrittiComponent } from './iscritti/iscritti.component';
import { MediciComponent } from './medici/medici.component';
import { AddPazienteComponent } from './add-paziente/add-paziente.component';
import { NuoveRichiesteComponent } from './nuove-richieste/nuove-richieste.component';
import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MedicoAuthComponent,
    PazienteAuthComponent,
    RegistrazioneMComponent,
    RegistrazionePComponent,
    AccessoMComponent,
    AccessoPComponent,
    DashboardMComponent,
    DashboardPComponent,
    IscrittiComponent,
    MediciComponent,
    AddPazienteComponent,
    NuoveRichiesteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: false,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerImmediately'
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
