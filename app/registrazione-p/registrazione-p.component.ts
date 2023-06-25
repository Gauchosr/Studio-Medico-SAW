import { Component } from '@angular/core';
import { AuthService } from '../servizi/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrazione-p',
  templateUrl: './registrazione-p.component.html',
  styleUrls: ['./registrazione-p.component.css']
})
export class RegistrazionePComponent {

  errorMessage: any
  constructor(private authService: AuthService, private router: Router) {}

  onRegistrati(form: NgForm) {
    //registrazione su Firebase
    this.authService.registratiP({email: form.value.email, password: form.value.password, returnSecureToken: true}).subscribe
    ((data:any) => {
      const expirationDate = new Date(new Date().getTime() + data.expiresIn*1000)
      this.authService.creaPaziente(data.localId, data.idToken, expirationDate, form.value.nome, form.value.cognome)
      localStorage.setItem('paziente', JSON.stringify(this.authService.paziente))
      this.authService.authP();
      //aggiunta paziente al DB
      this.authService.aggiungiListaPazienti({nome: form.value.nome, cognome: form.value.cognome, numero: form.value.numeroCellulare, data: form.value.dataNascita, email: form.value.email ,localId: this.authService.paziente.localId}).subscribe(
        data => console.log(data)
      )
      this.router.navigate(['/dashboard-p']);
      },
      (error) => {
        this.errorMessage = error.error.error.message
      }
    )
  }
}
