import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,

  children: [

    {
      path: 'overview',
      loadChildren: () => import('../menu-overview/menu-overview.module').then( m => m.MenuOverviewPageModule)
    },
    {
      path: 'members',
      loadChildren: () => import('../menu-members/menu-members.module').then( m => m.MenuMembersPageModule)
    },
    {
      path: 'tickets',
      loadChildren: () => import('../menu-tickets/menu-tickets.module').then( m => m.MenuTicketsPageModule)
    },
    {
      path: 'settings',
      loadChildren: () => import('../menu-settings/menu-settings.module').then( m => m.MenuSettingsPageModule)
    }, {
      path: '',
      redirectTo: '/menu/overview',
      pathMatch: 'full'
    }
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
