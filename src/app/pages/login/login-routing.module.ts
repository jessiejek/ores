import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { UserDataResolver } from '../../resolvers/userData.resolver';
import { HomeGuard } from '../../guards/home/home.guard';
const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    canActivate: [HomeGuard],
    resolve:{
      userData: UserDataResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
