import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuOverviewPage } from './menu-overview.page';

const routes: Routes = [
  {
    path: '',
    component: MenuOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuOverviewPageRoutingModule {}
