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
export class AuthGuard implements CanActivate {
  constructor(
    public storageService: StorageService,
    public router: Router,) {}
    canActivate(): Promise<boolean> {
      return new Promise((resolve) => {
        let userIdentifier;
        this.storageService.get(AuthConstants.AUTH).then(
            (res) => {
              //console.log(res);
              if(res){
                resolve(true);
              }else{
                resolve(false)
                this.router.navigate(["/login"]);
              }

          })
          .catch((err) => {
            resolve(false);
            this.router.navigate(["/login"]);
          });
      });
    }

}
