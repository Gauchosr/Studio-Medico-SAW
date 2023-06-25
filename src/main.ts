import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { NgOptimizedImage } from '@angular/common';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


Notification.requestPermission().then( (permission) => {
  if (permission === "granted") {
    console.log("Notifiche abilitate")
  }
  else {console.log("Le notifiche non sono abilitate!")}
});


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    console.log('Service Worker registrato con successo:', registration);
  }).catch(error => {
    console.log('Errore durante la registrazione del Service Worker:', error);
  });
} else {
  console.log('Il tuo browser non supporta i Service Worker.');
}



