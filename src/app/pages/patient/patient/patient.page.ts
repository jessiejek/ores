import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit {
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
    { title: 'Profile', url: '/patient/profile', icon: 'bar-chart' },
/*
    { title: 'Members', url: '/menu/members', icon: 'people' },
    { title: 'Tickets', url: '/menu/tickets', icon: 'ticket' },
    { title: 'Settings', url: '/menu/settings', icon: 'cog' },
*/
    { title: 'Log Out', url: '/out', icon: 'exit' }
  ];

  ngOnInit() {
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
