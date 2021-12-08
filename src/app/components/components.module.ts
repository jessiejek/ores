import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {PatientDataComponent} from "./patient-data/patient-data.component";
import { TextAvatarModule } from '../components/text-avatar';
@NgModule({
  declarations: [PatientDataComponent],
  exports: [PatientDataComponent],
  imports: [CommonModule, IonicModule,RouterModule,FormsModule,TextAvatarModule],
})
export class ComponentsModule { }
