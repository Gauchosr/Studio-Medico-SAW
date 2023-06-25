import { Component } from '@angular/core';
import { AuthService } from '../servizi/auth.service';
import { tap, switchMap } from 'rxjs';
@Component({
  selector: 'app-iscritti',
  templateUrl: './iscritti.component.html',
  styleUrls: ['./iscritti.component.css']
})
export class IscrittiComponent {

  iscritti: any = []
  localId_get: any
  url_get_iscritti : any
  constructor(private authService: AuthService){}

  ngOnInit(){
    const medicoJSON = localStorage.getItem('medico') // qui ho un JSON
    const obj_medico = JSON.parse(medicoJSON!) //qui un object
    this.localId_get = obj_medico.localId;
    this.url_get_iscritti = `https://studio-medico-210f9-default-rtdb.europe-west1.firebasedatabase.app/${this.localId_get}/iscritti.json`
    this.authService.getIscritti(this.url_get_iscritti).subscribe( (data:any) => {
      if(data != null){
      this.iscritti = Object.keys(data).map( (key:any) => {
        data[key]['id'] = key
        return data[key] })
      }
      else this.iscritti = []
    })
  }

  onEliminaIscritto(idIscritto: string){
    this.authService.eliminaIscritto(this.localId_get,idIscritto)
    .pipe(
        tap(data => console.log(data)),
        switchMap(() => this.authService.getIscritti(this.url_get_iscritti))).subscribe((data: any) => {
          if(data != null){
            this.iscritti = Object.keys(data).map( (key:any) => {
            data[key]['id'] = key
            return data[key] })
          }
          else this.iscritti = []
        })}

}








