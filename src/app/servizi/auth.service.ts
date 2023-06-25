import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../modelli/medico.model';
import { Paziente } from '../modelli/paziente.model';
@Injectable({
  providedIn: 'root'
})

//non si limita alla sola autenticazione, fa anche le richieste al db 

export class AuthService {
  //url endpoint iscrizione con email e password
  url_iscrizione = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKD-PWoQS-pePDimr3xIfXFP9nc6qbhrc"
  //url post sul db per inserire il medico
  url_database = "https://studio-medico-210f9-default-rtdb.europe-west1.firebasedatabase.app/"
  //url accedi
  url_accedi = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKD-PWoQS-pePDimr3xIfXFP9nc6qbhrc"


  isLoggedM = false;
  isLoggedP = false;

  medico!: Medico;
  paziente!: Paziente;

  constructor(private http: HttpClient) {
  }
//fa la post all'url passando il body
  registratiM(body:{}){
    return this.http.post(this.url_iscrizione, body);
  }

  creaMedico(localId: string, idToken: string, expDate: Date, nome: string, cognome: string){
    this.medico = new Medico(localId, idToken, expDate, nome, cognome);
    console.log(this.medico)
  }

  creaPaziente(localId: string, idToken: string, expDate: Date, nome: string, cognome:string){
    this.paziente = new Paziente(localId, idToken, expDate, nome, cognome);
  }


//si registra con la stessa chiamata del medico, l'aggiunta sara sui pazienti
  registratiP(body:{}){
    return this.http.post(this.url_iscrizione, body);
  }

  aggiungiMedico(body:{}){
    const localId = this.medico.localId
    const url_def = `${this.url_database}${localId}.json`
    return this.http.post(url_def, body);
  }

  aggiungiListaMedici(body:{}){
    const url_listamedici = `${this.url_database}listamedici.json`
    return this.http.post(url_listamedici, body)
  }

  aggiungiListaPazienti(body:{}){
    const localId = this.paziente.localId
    const url_listapazienti = `${this.url_database}listapazienti/${localId}.json`
    return this.http.post(url_listapazienti, body)
  }

  aggiungiPaziente(body:{}){
    return this.http.post(this.url_database, body);
  }

  accedi(body:{}){
    return this.http.post(this.url_accedi, body);
  }

  logoutM(){
    this.isLoggedM = false;
  }

  logoutP(){
    this.isLoggedP = false;
  }

  authP(){
    this.isLoggedP = true;
  }
  authM(){
    this.isLoggedM = true;
  }

  getIscritti(url: string){
    return this.http.get(url);
  }
  getRichieste(url: string){
    return this.http.get(url);
  }

  getMedici(){
    return this.http.get("https://studio-medico-210f9-default-rtdb.europe-west1.firebasedatabase.app/listamedici.json");
  }

  getMediciAccesso(localId: string){
    return this.http.get(`${this.url_database}${localId}.json`)
  }

  richiestaIscrizione(localIdMedico: string,nome: string, cognome: string, localId: string){
    const url_richiesta_iscrizione = `${this.url_database}${localIdMedico}/richieste.json`
    return this.http.post(url_richiesta_iscrizione,{nome, cognome, localId})
  }

  //prende dal DB nome e cognome del paziente loggato
  getPaziente(localId: string){
    const url_listapazienti_paziente = `${this.url_database}listapazienti/${localId}.json`
    return this.http.get(url_listapazienti_paziente);
  }

  eliminaRichiesta(localIdMedico: string, localIdRichiesta: string){
    const url = `${this.url_database}${localIdMedico}/richieste/${localIdRichiesta}.json`
    return this.http.delete(url)
  }

  inserisciPaziente(url: string, body: {}){
    return this.http.post(url, body)
  }

  eliminaIscritto(localIdMedico: string, localIdIscritto: string){
    const url = `${this.url_database}${localIdMedico}/iscritti/${localIdIscritto}.json`
    return this.http.delete(url)
  }

}
