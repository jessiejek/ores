import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuMembersPage } from './menu-members.page';

const routes: Routes = [
  {
    path: '',
    component: MenuMembersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuMembersPageRoutingModule {}
