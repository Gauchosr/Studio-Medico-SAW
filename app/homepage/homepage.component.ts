import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HomepageComponent implements OnInit {
  showTitle: boolean = false;
  showSubtitle: boolean = false;
  showButtons: boolean = false;

  ngOnInit() {
    setTimeout(() => {
      this.showTitle = true;
      setTimeout(() => {
        this.showSubtitle = true;
        setTimeout(() => {
          this.showButtons = true;
        }, 500); // Ritardo di 500 millisecondi per mostrare i bottoni dopo la scritta
      }, 500); // Ritardo di 500 millisecondi per mostrare la sottotitolo dopo la scritta
    }, 500); // Ritardo di 500 millisecondi per mostrare il titolo iniziale
  }


}
