import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

import { UserDataResolver } from '../resolvers/userData.resolver';
import { HomeGuard } from '../guards/home/home.guard';
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [HomeGuard],
    resolve:{
      userData: UserDataResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
