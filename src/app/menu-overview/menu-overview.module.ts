import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuOverviewPageRoutingModule } from './menu-overview-routing.module';

import { MenuOverviewPage } from './menu-overview.page';
import { ChartModule } from 'angular-highcharts';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuOverviewPageRoutingModule,
    ChartModule
  ],
  declarations: [MenuOverviewPage]
})
export class MenuOverviewPageModule {}
