import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {PatientDataComponent} from "./patient-data/patient-data.component";
import { TextAvatarModule } from '../components/text-avatar';
import {AddusersComponent} from './addusers/addusers.component';
@NgModule({
  declarations: [PatientDataComponent,AddusersComponent],
  exports: [PatientDataComponent],
  imports: [CommonModule, IonicModule,RouterModule,FormsModule,TextAvatarModule,ReactiveFormsModule],
})
export class ComponentsModule { }
