import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSizeService } from '../services/screen-size/screen-size.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
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
  public appPages = [
    { title: 'Over View', url: '/menu/overview', icon: 'bar-chart' },
    { title: 'Members', url: '/menu/members', icon: 'people' },
    { title: 'Tickets', url: '/menu/tickets', icon: 'ticket' },
    { title: 'Settings', url: '/menu/settings', icon: 'cog' },
    { title: 'Log Out', url: '/out', icon: 'exit' }
  ];

  ngOnInit() {
  }
  logout(){

  }
  goto(to){
    //console.log(to);

    if(to != '/out'){
      this.router.navigate([to]);
    }else{
      localStorage.removeItem('userData');
      this.router.navigate(['/login']);
    }
  }
}
