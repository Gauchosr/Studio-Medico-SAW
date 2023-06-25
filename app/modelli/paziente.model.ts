export class Paziente {
  constructor(
    public localId: string, //su questo indice devo fare l'aggiunta al DB
    public idToken: string, //token di autenticazione
    public _expDate: Date,
    public nome: string,
    public cognome: string
  ){}
}
