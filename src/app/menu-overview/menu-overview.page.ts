import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSizeService } from '../services/screen-size/screen-size.service';

@Component({
  selector: 'app-menu-overview',
  templateUrl: './menu-overview.page.html',
  styleUrls: ['./menu-overview.page.scss'],
})
export class MenuOverviewPage implements OnInit {
  isDesktop: boolean;
  constructor(
    private screensizeService: ScreenSizeService,
    public router:Router
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {
  }

}
