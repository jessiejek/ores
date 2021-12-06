import { Component, Renderer2 } from '@angular/core';
import { initializeApp } from '@firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(    private renderer: Renderer2) {

  }

}
