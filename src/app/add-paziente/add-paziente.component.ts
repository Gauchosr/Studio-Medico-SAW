import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../servizi/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-paziente',
  templateUrl: './add-paziente.component.html',
  styleUrls: ['./add-paziente.component.css']
})
export class AddPazienteComponent {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router){}

  onAggiungiPaziente(form: NgForm){

    const medicoJSON = localStorage.getItem('medico') // qui ho un JSON
    const obj_medico = JSON.parse(medicoJSON!) //qui un object
    const localId_get = obj_medico.localId;
    const url_get_iscritti = `https://studio-medico-210f9-default-rtdb.europe-west1.firebasedatabase.app/${localId_get}/iscritti.json`

    const paziente = {
      nome: form.value.nome,
      cognome: form.value.cognome,
      telefono: form.value.numeroCellulare,
      data: form.value.dataNascita,
      email: form.value.email
    }
    this.authService.inserisciPaziente(url_get_iscritti, paziente).subscribe((data) => {
      console.log("inserimento paziente effettuato con successo")
      this.router.navigate(['/dashboard-m/iscritti'])
      },
      (error) => {console.log("errore nell'aggiunta del paziente")})
  }

}
