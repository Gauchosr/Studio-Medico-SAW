import { Component } from '@angular/core';
import { AuthService } from '../servizi/auth.service';
import { NgForm } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-accesso-p',
  templateUrl: './accesso-p.component.html',
  styleUrls: ['./accesso-p.component.css']
})



export class AccessoPComponent {

  
  errorMessage: any

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Controlla se l'utente sta navigando all'indietro
        if (event.navigationTrigger === 'popstate') {
          localStorage.clear();
          this.authService.logoutP();
        }
      }
    });
  }


  onAccedi(form: NgForm){
    this.authService.accedi({email: form.value.email, password: form.value.password, returnSecureToken: true}).subscribe
      ((data: any) => {
        const expirationDate = new Date(new Date().getTime() + data.expiresIn*1000)
        const idToken = data.idToken
        const localId = data.localId
        this.authService.getPaziente(data.localId).subscribe(
          (data: any) => {
            const nomecognome = Object.keys(data).map( (key:any) => { return data[key] })
            this.authService.creaPaziente(localId, idToken, expirationDate, nomecognome[0].nome, nomecognome[0].cognome)
            localStorage.setItem('paziente', JSON.stringify(this.authService.paziente))
            this.authService.authP();
            this.router.navigate(['dashboard-p'])
          })
        },
        (error) => {
          this.errorMessage = error.error.error.message
        }
    )
  }

}
