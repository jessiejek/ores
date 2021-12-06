import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuSettingsPageRoutingModule } from './menu-settings-routing.module';

import { MenuSettingsPage } from './menu-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuSettingsPageRoutingModule
  ],
  declarations: [MenuSettingsPage]
})
export class MenuSettingsPageModule {}
