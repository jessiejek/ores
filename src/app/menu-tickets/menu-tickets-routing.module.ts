import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuTicketsPage } from './menu-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: MenuTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuTicketsPageRoutingModule {}
