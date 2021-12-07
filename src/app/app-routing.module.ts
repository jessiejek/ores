import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  }/*,
  {
    path: 'menu-overview',
    loadChildren: () => import('./menu-overview/menu-overview.module').then( m => m.MenuOverviewPageModule)
  },
  {
    path: 'menu-members',
    loadChildren: () => import('./menu-members/menu-members.module').then( m => m.MenuMembersPageModule)
  },
  {
    path: 'menu-settings',
    loadChildren: () => import('./menu-settings/menu-settings.module').then( m => m.MenuSettingsPageModule)
  },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
