import { Component, OnInit } from '@angular/core';
import { ScreenSizeService } from '../services/screen-size/screen-size.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  isDesktop: boolean;
  constructor(    private screensizeService: ScreenSizeService) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        // Reload because our routing is out of place
        //window.location.reload();
      }

      this.isDesktop = isDesktop;
      console.log(this.isDesktop );

    });
  }

  ngOnInit() {
  }
  logout(){

  }

}
