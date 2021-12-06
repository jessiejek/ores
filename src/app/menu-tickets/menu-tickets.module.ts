import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuTicketsPageRoutingModule } from './menu-tickets-routing.module';

import { MenuTicketsPage } from './menu-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuTicketsPageRoutingModule
  ],
  declarations: [MenuTicketsPage]
})
export class MenuTicketsPageModule {}
