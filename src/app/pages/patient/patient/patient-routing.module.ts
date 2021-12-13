import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientGuard } from '../../../guards/patient/patient.guard';
import { UserDataResolver } from '../../../resolvers/userData.resolver';
import { PatientPage } from './patient.page';

const routes: Routes = [
  {
    path: '',
    component: PatientPage,
    canActivate: [PatientGuard],
    resolve:{
      userData: UserDataResolver
    },
    children: [

      {
        path: 'profile',
        loadChildren: () => import('../../../pages/patient/profile/profile.module').then( m => m.ProfilePageModule)
      }, {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientPageRoutingModule {}
