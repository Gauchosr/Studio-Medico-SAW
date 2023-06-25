import { Component } from '@angular/core';
import { AuthService } from '../servizi/auth.service';
import { Router } from '@angular/router';
import { concatMap, switchMap, tap } from 'rxjs';
import { NotificheService } from '../servizi/notifiche.service';


@Component({
  selector: 'app-nuove-richieste',
  templateUrl: './nuove-richieste.component.html',
  styleUrls: ['./nuove-richieste.component.css']
})
export class NuoveRichiesteComponent {


  nuove_richieste = false;

  constructor(private authService: AuthService, private router: Router, private notifiche: NotificheService){}

  richieste: any = []
  medicoJSON : any
  obj_medico : any
  localId_medico : any
  url_get_richieste: any
  paziente: any




  ngOnInit(){
    this.medicoJSON = localStorage.getItem('medico') // qui ho un JSON
    this.obj_medico = JSON.parse(this.medicoJSON!) //qui un object
    this.localId_medico = this.obj_medico.localId; //salvo l'id locale del medico

    //richiesta al db
    this.url_get_richieste = `https://studio-medico-210f9-default-rtdb.europe-west1.firebasedatabase.app/${this.localId_medico}/richieste.json`
    this.authService.getRichieste(this.url_get_richieste).subscribe( (data:any) => {
      console.log(data)
      if(data != null){
      this.richieste = Object.keys(data).map( (key:any) => {
        data[key]['id'] = key
        return data[key] })
        console.log(this.richieste)
      }
    })
  }

    onAccetta(localId: string) {
      this.authService.getPaziente(localId).pipe(
        concatMap((data: any) => {
          this.paziente = Object.keys(data).map((key: any) => data[key]);
          const url_aggiunta = `${this.authService.url_database}${this.localId_medico}/iscritti.json`;
          return this.authService.inserisciPaziente(url_aggiunta, this.paziente[0]).pipe(
            concatMap(() => this.authService.eliminaRichiesta(this.localId_medico, this.richieste[0].id))
          );
        })
      ).subscribe(() => {
        this.router.navigate(['/dashboard-m/iscritti']);
      });
    }

    onRifiuta(localId: string) {
      // Rimuovere dal DB la richiesta
      this.authService.eliminaRichiesta(this.localId_medico, this.richieste[0].id).pipe(
        tap(data => console.log(data)),
        switchMap(() => this.authService.getRichieste(this.url_get_richieste))
      ).subscribe((data: any) => {
        if (data != null) {
          this.richieste = Object.keys(data).map((key: any) => {
            data[key]['id'] = key;
            return data[key];
          });
        } else {
          this.richieste = [];
        }
        console.log(this.richieste);
      });
    }
  }
