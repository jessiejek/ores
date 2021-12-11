import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuAdduserPageRoutingModule } from './menu-adduser-routing.module';

import { MenuAdduserPage } from './menu-adduser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuAdduserPageRoutingModule
  ],
  declarations: [MenuAdduserPage]
})
export class MenuAdduserPageModule {}
