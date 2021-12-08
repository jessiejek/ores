import { Component, Renderer2,HostListener } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { AlertController, Platform } from '@ionic/angular';
import { ScreenSizeService } from './services/screen-size/screen-size.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private renderer: Renderer2,
    private platform: Platform,
    private screensizeService: ScreenSizeService,
    private update: SwUpdate,
    private alertController:AlertController) {
    this.initApp();
    this.updateClient();
  }



  updateClient() {
    if (!this.update.isEnabled) {
      console.log('not enabled');
    } else {
      console.log('enabled');
    }
    this.update.available.subscribe((event) => {
      this.presentAlertConfirm();
    });
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Update Available',
      buttons: [
        {
          text: 'Update',
          handler: () => {
            this.update.activateUpdate().then(() => location.reload());
          },
        },
      ],
    });
    await alert.present();
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
