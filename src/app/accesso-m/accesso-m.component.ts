import { Component } from '@angular/core';
import { AuthService } from '../servizi/auth.service';
import { NgForm } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-accesso-m',
  templateUrl: './accesso-m.component.html',
  styleUrls: ['./accesso-m.component.css']
})


export class AccessoMComponent {

  errorMessage: any
  nome: any
  cognome: any
  app: any
  constructor (private authService: AuthService, private router: Router) {}

    ngOnInit() {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          // Controlla se l'utente sta navigando all'indietro
          if (event.navigationTrigger === 'popstate') {
            localStorage.clear();
            this.authService.logoutM();
          }
        }
      });
    }


  onAccedi(form: NgForm){
    //richiesta accesso effettiva per i 2 token e la expDate
    this.authService.accedi({email: form.value.email, password: form.value.password, returnSecureToken: true}).subscribe
    ((data: any) => {
      const localId = data.localId
      const idToken = data.idToken
      const expirationDate = new Date(new Date().getTime() + data.expiresIn*1000)
      this.authService.getMediciAccesso(localId).subscribe( (data:any) => {
        this.app = Object.values(data)
        this.nome = this.app[0].nome
        this.cognome = this.app[0].cognome
        this.authService.creaMedico(localId, idToken, expirationDate, this.nome, this.cognome)
        localStorage.setItem('medico', JSON.stringify(this.authService.medico))
        this.authService.authM();
        this.router.navigate(['/dashboard-m'])
      })
    },
    (error: any) => {
     this.errorMessage = error.error.error.message
    })
  }
}

