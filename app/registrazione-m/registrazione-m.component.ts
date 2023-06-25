import { Component } from '@angular/core';
import { AuthService } from '../servizi/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrazione-m',
  templateUrl: './registrazione-m.component.html',
  styleUrls: ['./registrazione-m.component.css'],

})
export class RegistrazioneMComponent {

  errorMessage: any
  constructor(private authService: AuthService, private router: Router) {}

  //fa la richiesta di registrazione e aggiunge nel database alla tabella medici il valore
  onRegistrati(form: NgForm) {
    //registrazione su Firebase
    this.authService.registratiM({email: form.value.email, password: form.value.password, returnSecureToken: true}).subscribe
    ((data:any) => {
        const expirationDate = new Date(new Date().getTime() + data.expiresIn*1000)
        //variabile interna
        this.authService.creaMedico(data.localId, data.idToken, expirationDate, form.value.nome, form.value.cognome)
        //aggiunta al local storage
        localStorage.setItem('medico', JSON.stringify(this.authService.medico))
        //autenticazione
        this.authService.authM();
        //aggiunta medico al DB
        this.authService.aggiungiMedico({ nome: form.value.nome, cognome: form.value.cognome, telefono: form.value.numeroFisso, cellulare: form.value.numeroCellulare, specialistica: form.value.specialistica, email: form.value.email, iscritti:[], richieste: []}).subscribe
        (data => console.log(data))
        //aggiunta alla lista medici visualizzabile dai pazienti iscritti, ho aggiunto local id perche su quello faccio l richieste
        this.authService.aggiungiListaMedici({nome: form.value.nome, cognome: form.value.cognome, telefono: form.value.numeroFisso, cellulare: form.value.numeroCellulare, specialistica: form.value.specialistica, email: form.value.email, localId: this.authService.medico.localId }).subscribe
        (data => console.log(data))
        this.router.navigate(['/dashboard-m']);
      },
      (error) => {
        this.errorMessage = error.error.error.message
      })

  }
}

