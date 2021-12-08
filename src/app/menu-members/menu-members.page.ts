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
  ngOnInit() {

    this.crudService.getData('users').subscribe(
      res=>{
        console.log(res);
        this.listOfMembers=res;
      }
      );
  }

}
