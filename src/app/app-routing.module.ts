import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MedicoAuthComponent } from './medico-auth/medico-auth.component';
import { PazienteAuthComponent } from './paziente-auth/paziente-auth.component';
import { RegistrazioneMComponent } from './registrazione-m/registrazione-m.component';
import { RegistrazionePComponent } from './registrazione-p/registrazione-p.component';
import { AccessoMComponent } from './accesso-m/accesso-m.component';
import { AccessoPComponent } from './accesso-p/accesso-p.component';
import { DashboardMComponent } from './dashboard-m/dashboard-m.component';
import { GuardMGuard } from './guards/guard-m.guard';
import { DashboardPComponent } from './dashboard-p/dashboard-p.component';
import { GuardPGuard } from './guards/guard-p.guard';
import { IscrittiComponent } from './iscritti/iscritti.component';
import { MediciComponent } from './medici/medici.component';
import { AddPazienteComponent } from './add-paziente/add-paziente.component';
import { NuoveRichiesteComponent } from './nuove-richieste/nuove-richieste.component';
import { FallbackComponent } from './fallback/fallback.component';
import { OfflineGuard } from './guards/offline.guard';


const routes: Routes = [{ path: '', pathMatch:'full' , redirectTo:'/homepage' },
{ path: 'homepage', component: HomepageComponent, canActivate: [OfflineGuard]},
{path: 'fallback', component: FallbackComponent},
{ path: 'medico-auth', component: MedicoAuthComponent, canActivate: [OfflineGuard]},
{ path: 'paziente-auth', component: PazienteAuthComponent, canActivate: [OfflineGuard]},
{ path: 'registrazione-m', component: RegistrazioneMComponent, canActivate: [OfflineGuard]},
{ path: 'registrazione-p', component: RegistrazionePComponent, canActivate: [OfflineGuard]},
{ path: 'accesso-m', component: AccessoMComponent, canActivate: [OfflineGuard]},
{ path: 'accesso-p', component: AccessoPComponent, canActivate: [OfflineGuard]},
{ path: 'dashboard-m', component: DashboardMComponent, canActivate: [GuardMGuard, OfflineGuard], children: [
  { path: '', redirectTo: 'iscritti', pathMatch: 'full'},
  { path: 'iscritti', component: IscrittiComponent},
  { path: 'nuove-richieste', component: NuoveRichiesteComponent},
  { path: 'add-paziente', component: AddPazienteComponent}
]},
{ path: 'dashboard-p', component: DashboardPComponent, canActivate: [GuardPGuard, OfflineGuard], children: [
  {path: '', redirectTo: 'medici', pathMatch: 'full'},
  {path: 'medici', component: MediciComponent},
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
