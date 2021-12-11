import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { ScreenSizeService } from '../services/screen-size/screen-size.service';

@Component({
  selector: 'app-menu-members',
  templateUrl: './menu-members.page.html',
  styleUrls: ['./menu-members.page.scss'],
})
export class MenuMembersPage implements OnInit {
  isDesktop:boolean;
  constructor(    private crudService:CrudService,
    public screensizeService:ScreenSizeService) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
      //////console.log(this.isDesktop );
    });
  }
  listOfMembers:any;
  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  ngOnInit() {
    this.listOfMembers=[];
    this.crudService.getDataAggregate('patientData').subscribe(
      res=>{
        console.log(res);
        res.forEach(el => {

          console.log(JSON.stringify(el));

        })
      }
      );

  }

}
