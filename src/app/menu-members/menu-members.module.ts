import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuMembersPageRoutingModule } from './menu-members-routing.module';

import { MenuMembersPage } from './menu-members.page';
import { TextAvatarModule } from '../components/text-avatar/text-avatar.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextAvatarModule,
    MenuMembersPageRoutingModule
  ],
  declarations: [MenuMembersPage]
})
export class MenuMembersPageModule {}
