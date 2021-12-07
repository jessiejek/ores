import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { AuthConstants } from "../../config/auth-constants";
import { BehaviorSubject, Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData$ = new BehaviorSubject<any>(null);
  constructor(
    private storageService: StorageService
  ) { }
  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then((res) => {
      this.userData$.next(res);
    });
  }
}
