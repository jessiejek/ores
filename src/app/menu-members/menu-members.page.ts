import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { ScreenSizeService } from '../services/screen-size/screen-size.service';
import {AddusersComponent} from '../components/addusers/addusers.component';
import { ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-menu-members',
  templateUrl: './menu-members.page.html',
  styleUrls: ['./menu-members.page.scss'],
})
export class MenuMembersPage implements OnInit {
  isDesktop:boolean;
  constructor(
    private crudService:CrudService,
    public screensizeService:ScreenSizeService,
    public modalController:ModalController,
    private formBuilder: FormBuilder) {
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

    this.crudService.getDataAggregate('patientData').subscribe(
      res=>{
        this.listOfMembers=res;
      }
      );

  }
  async addUser(){
      const modal = await this.modalController.create({
        component: AddusersComponent,
        cssClass: 'my-custom-class',
      });
      return await modal.present();
  }
}
