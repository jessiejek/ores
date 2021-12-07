import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth'

export  interface UserPro{
  username: string;
  uid: string;
}
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private user : UserPro;
  constructor(
    public fireservices:AngularFirestore,
    public auth: AngularFireAuth,) { }






    loginFireauth(value){

     }

     setUser(user: UserPro){
      return this.user = user;
    }

    getUID(): string{
      return this.user.uid;
    }

















  createNewEmplyoee(Record){

//this.fireservices.collection('Employee').get();
    return this.fireservices.collection('Employee').add(Record);
  }
  getEmployee(){
    const ref = this.fireservices.collection('Employee');
    return ref.valueChanges({idField: 'id'});

  }

  deleteEmployee(del:any){
    this.fireservices.collection('Employee').doc(del).delete();
  }
  updateEmployee(data:any){
    this.fireservices.collection('Employee').doc(data).update({name:'Jessie Jay'});
  }
}
