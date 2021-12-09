import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
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



    getUserInfo(data,id){
      /*const ref = this.fireservices.collection('Employee').doc(id).where
      return ref.valueChanges({idField: 'id'});*/
      const ref = this.fireservices.collection(data).doc(id);
      return ref.valueChanges({idField: 'id'});
    }
    getData(data){
      const ref = this.fireservices.collection(data);
      return ref.valueChanges({idField: 'id'});

    }

    loginFireauth(value){
      return new Promise<any> ( (resolve, reject)=>{
        firebase.auth().signInWithEmailAndPassword(value.email, value.password).then(
          res => resolve(res),
          error => reject(error)
        )
      })
     }











     getDocsByParam(collect, getParam:string, operator:any ,paramValue:string ) {
        return this.fireservices.collection(
          collect,
          ref => ref.where(getParam, operator, paramValue)
          ).get();
    }
    getHeatMapData(collect,gender,type,age){
      let ageage = age +10;
    return this.fireservices.collection(
      collect,
      ref => ref
                .where('SEX', '==', gender)
                .where('AGE', '>=', parseFloat(age))
                .where('AGE', '<=', parseFloat(ageage))
                .where('SMOKING', '==', type)
    ).get();
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
    this.fireservices.collection('Employee').doc(del).get().subscribe
  }
  updateEmployee(data:any){
    this.fireservices.collection('Employee').doc(data).update({name:'Jessie Jay'});
  }
}
