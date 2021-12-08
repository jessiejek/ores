import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule} from '@angular/fire/compat/database'
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { CrudService } from './services/crud.service';
import { CommonModule } from '@angular/common';
import { ScreenSizeService } from './services/screen-size/screen-size.service';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ChartModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,},CrudService,ScreenSizeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
