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

    let record = '{"LAST NAME":"name last","FIRST NAME":"name first","MIDDLE NAME":"name middel","EMPLOYEE NUMBER":13969,"PRINCIPAL OR DEPENDENT":"Principal","AGE":34,"SEX":"F","GENDER":"F","MARITAL STATUS":"MARRIED","ADDRESS (CITY)":"PASAY","EDUCATION":"COLLEGE","EMPLOYMENT":"PRIVATE","INCOME":"Above 400, 000 to 800,000","RANK":"Trainer","UNIT":"Back office","TENURE":"<1 year","SBP":125,"DBP":85,"CHOL(mg/dL) Normal Value < 200 mg/dL":200,"HDL (mg/dL) Normal Value 40-60 mg/dL":42,"FBS (mg/dL) Normal Value 70-100 mg/dL":85,"Urine Ketone Normal value: Negative":"Negative","WC (cm)":75,"W/H RATIO":0.7,"HPN":"No","DM":"No","HPN + DM":"CAN WE MAKE AS FORMULA","SMOKING":"Never smoked","ALCOHOL INTAKE":"Occasional Drinker","PHYSICAL ACTIVITY":"No Exercise","DIETARY INTAKE":"High Salt"}';

    record = JSON.parse(record);


//this.fireservices.collection('Employee').get();
    return this.fireservices.collection('testAdd').add(record);
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
