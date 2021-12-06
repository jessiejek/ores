import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuOverviewPageRoutingModule } from './menu-overview-routing.module';

import { MenuOverviewPage } from './menu-overview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuOverviewPageRoutingModule
  ],
  declarations: [MenuOverviewPage]
})
export class MenuOverviewPageModule {}
