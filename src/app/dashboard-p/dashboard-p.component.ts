import { Component } from '@angular/core';
import { AuthService } from '../servizi/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-p',
  templateUrl: './dashboard-p.component.html',
  styleUrls: ['./dashboard-p.component.css']
})
export class DashboardPComponent {

  pazienteJSON: any
  paziente: any
  nome: any
  cognome: any

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.pazienteJSON = localStorage.getItem('paziente')
    this.paziente = JSON.parse(this.pazienteJSON)
    this.nome = this.paziente.nome
    this.cognome = this.paziente.cognome
  }

  onLogout(){
    localStorage.clear();
    this.authService.logoutP();
    this.router.navigate(['/homepage']);
  }
}
