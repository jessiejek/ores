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
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }
  public appPages = [
    { title: 'Over View', url: '/menu/overview', icon: 'bar-chart' },
    { title: 'Members', url: '/menu/members', icon: 'people' },
    { title: 'Tickets', url: '/menu/tickets', icon: 'ticket' },
    { title: 'Settings', url: '/menu/settings', icon: 'cog' }
  ];

  ngOnInit() {
  }
  logout(){

  }

}
