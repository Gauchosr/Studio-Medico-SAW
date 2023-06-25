import { Component } from '@angular/core';
import { AuthService } from '../servizi/auth.service';
@Component({
  selector: 'app-medici',
  templateUrl: './medici.component.html',
  styleUrls: ['./medici.component.css']
})
export class MediciComponent {

  constructor(private authService: AuthService){}

  oggetto: Object = {}
  medici: any
  ngOnInit(){
    this.authService.getMedici().subscribe
    ( (data: any) => {
        this.oggetto = data
        this.medici = Object.keys(data).map( (key) => { return data[key]})
        console.log(this.medici)
      })
  }

  onRichiestaIscrizione(localIdMedico: string){
    const pazienteJSON = localStorage.getItem('paziente') // qui ho un JSON
    const obj_paziente = JSON.parse(pazienteJSON!) //qui un object
    const localId_get = obj_paziente.localId
    const nome = obj_paziente.nome
    const cognome = obj_paziente.cognome
    this.authService.richiestaIscrizione(localIdMedico, nome, cognome, localId_get).subscribe(data => console.log(data))
  }

}

