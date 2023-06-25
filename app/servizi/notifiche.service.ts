import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificheService {

  constructor() { }

  sendNotification(message: string){
    if(!("Notification" in window)){
      alert("Notifiche non supportate in questo browser")
    } else if (Notification.permission === "granted") {
      const notification = new Notification(message)
    }
    else if ( Notification.permission !== "denied"){
      //chiediamo permesso
      Notification.requestPermission().then((permission) => {
        //se accetta creiamo
        if (permission === 'granted'){
          const notification = new Notification(message)
        }
      })
    }
  }

}
