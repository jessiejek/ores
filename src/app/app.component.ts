import { Component, Renderer2,HostListener } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { Platform } from '@ionic/angular';
import { ScreenSizeService } from './services/screen-size/screen-size.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private renderer: Renderer2,
    private platform: Platform,
    private screensizeService: ScreenSizeService) {
    this.initApp();
  }




  initApp(){
    this.platform.ready().then(() => {

      this.screensizeService.onResize(this.platform.width());

    });
  }
  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.screensizeService.onResize(event.target.innerWidth);
  }
}
