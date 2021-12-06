import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuSettingsPage } from './menu-settings.page';

const routes: Routes = [
  {
    path: '',
    component: MenuSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuSettingsPageRoutingModule {}
