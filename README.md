# Studio-Medico-SAW
La PWA è stata scritta in Angular.
Utilizza il sistema di autenticazione, tramite email e password, di Firebase.
Lo scopo della PWA è quello di implementare un softare gestionale di uno Studio Medico.
E' possibile registrarsi sia come Medico che come Paziente.
Effettuando l'accesso o la registrazione come Medico si ha accesso a una dashboard in cui è possibile: 
  - Visualizzare i propri Iscritti
  - Aggiungere nuovi Iscritti
  - Rimuovere Pazienti già iscritti
  - Visualizzare l'elenco di Richieste di iscrizione effettuate dai Pazienti, accettarle o rifiutarle (la presenza di richieste in pending genererà una notifica push, se queste sono consentite, del sistema in cui l'applicazione viene lanciata).
Effettuando l'accesso o la registrazione come Paziente si ha accesso a una dashboard in cui è possibile:
   - Visualizzare l'elenco di Medici registrati e le loro informazioni necessarie (Specializzazione, ecc..)
   - Mandare una Richiesta di iscrizione (questa azione genererà una notifica al momento di avvio dell'applicazione da parte del Medico).

La PWA è installabile sul dispositivo tramite un pulsante posto sul tab del browser.
Integra una Fallback page che si aprirà in mancanza di rete.
Utilizza il service worker predefinito di Angular.
    
