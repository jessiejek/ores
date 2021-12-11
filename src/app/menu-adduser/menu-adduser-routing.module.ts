import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuAdduserPage } from './menu-adduser.page';

const routes: Routes = [
  {
    path: '',
    component: MenuAdduserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuAdduserPageRoutingModule {}
