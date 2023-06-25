import { Component } from '@angular/core';
import { AuthService } from '../servizi/auth.service';
import { Router } from '@angular/router';
import { NotificheService } from '../servizi/notifiche.service';
@Component({
  selector: 'app-dashboard-m',
  templateUrl: './dashboard-m.component.html',
  styleUrls: ['./dashboard-m.component.css']
})
export class DashboardMComponent {


  constructor(private authService: AuthService, private router: Router, private notifiche: NotificheService){}

  richieste: any
  url_get_richieste: any
  localId_medico : any
  medicoJSON: any
  obj_medico: any
  nome: any
  cognome: any

  ngOnInit(){

    this.medicoJSON = localStorage.getItem('medico') // qui ho un JSON
    this.obj_medico = JSON.parse(this.medicoJSON!) //qui un object
    this.localId_medico = this.obj_medico.localId; //salvo l'id locale del medico
    this.nome = this.obj_medico.nome
    this.cognome = this.obj_medico.cognome

    this.url_get_richieste = `https://studio-medico-210f9-default-rtdb.europe-west1.firebasedatabase.app/${this.localId_medico}/richieste.json`
    this.authService.getRichieste(this.url_get_richieste).subscribe( (data:any) => {
      if(data != null){
        this.richieste = Object.keys(data).map( (key:any) => {
        data[key]['id'] = key
        return data[key] })
        this.notifiche.sendNotification(`Hai ${this.richieste.length} nuove richieste di iscrizione`)
      }
    })
  }

  onLogout(){
    localStorage.clear();
    this.authService.logoutM();
    this.router.navigate(['/homepage']);
  }

}
