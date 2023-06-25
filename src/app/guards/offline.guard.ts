import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OfflineGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (!navigator.onLine) {
      this.router.navigate(['/fallback']); // Naviga alla pagina di fallback
      return false;  // Blocca l'accesso alle altre pagine
    }
    return true; // Consenti l'accesso alle altre pagine
  }
}
