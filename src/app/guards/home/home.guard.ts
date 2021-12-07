import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthConstants } from "../../config/auth-constants";
import firebase from 'firebase/compat/app';
import 'firebase/app';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(
    public storageService: StorageService,
    public router: Router,) {}
    canActivate(): Promise<boolean> {
      return new Promise((resolve) => {
        //console.log('at home guard');

        let userIdentifier;
        this.storageService.get(AuthConstants.AUTH).then(
            (res) => {
              //console.log(res);
              if(res){
                resolve(false);
                this.router.navigate(["/menu"]);
              }else{
                resolve(true)

              }

          })
          .catch((err) => {
            resolve(true);
          });
      });
    }
}
