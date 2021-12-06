import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservices:AngularFirestore) { }

  createNewEmplyoee(Record){


    return this.fireservices.collection('Employee').add(Record);
  }
}
