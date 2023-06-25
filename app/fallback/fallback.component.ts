import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-fallback',
  templateUrl: './fallback.component.html',
  styleUrls: ['./fallback.component.css']
})
export class FallbackComponent {

  constructor(private router: Router){}

  onRiprova(){
    this.router.navigate(['homepage']);
  }

}
