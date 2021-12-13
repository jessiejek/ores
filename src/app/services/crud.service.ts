import { Injectable } from '@angular/core';
import { AngularFirestore, } from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
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
    public auth: AngularFireAuth,
    private angularFireAuth: AngularFireAuth,
    private db: AngularFireDatabase) { }



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
    getDataAggregate(data){

      const ref = this.fireservices.collection(data);
      return ref.valueChanges({idField: 'id'});

     /*
      this.fireservices
      .collection(data)
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
          console.log(doc.data());

        });
      });*/

      /*this.expensesCollection = this.db.collection('/expenses', ref => ref.where('expenseId', '==', this.expenseId));
      const categoryDoc = await this.fireservices.collection('Category').where('UserId', '==', userId).get()
      const categoryId = categoryDoc.id
      const purchaseDoc = await this.fireservices.collection('Purchase').where('CategoryId', '==', categoryId).get()
      // Do whatever you need with the document*/

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
    getHeatMapData(collect,gender,type,age,dm){


      let ageage = age +10;
    return this.fireservices.collection(
      collect,
      ref => ref
                .where('SEX', '==', gender)
                .where('AGE', '>=', parseFloat(age))
                .where('AGE', '<=', parseFloat(ageage))
                .where('DM', '==', dm)
                .where('SMOKING', '==', type)

    ).get();
    }



  addMembersAUTH(data){
    let xx = '['+JSON.stringify(data)+']';
    let yy = JSON.parse(xx);
    let email;
    let password;
    yy.forEach(element => {
      email = element.email;
      password = element.password;
        //uid = this.SignUp(element.email,element.password);
    });
    this.SignUp(email,password).then(res => {
      console.log('You are Successfully signed up!', res);
      console.log(res.user.uid);
      this.addMembersUsers(yy,res.user.uid);
      this.addMembersPatientData(yy,res.user.uid);
      //return res.user.uid;
    }).catch(error => {
      console.log('Something is wrong:', error.message);
    });
  }
  addMembersUsers(data,id){
    let users={};
    let adminStatus;
    let nurseStatus
    let patientStatus
    data.forEach(element => {
      if(element.adminStatus == 'true'){
        adminStatus=true;
      }else{
        adminStatus=false;
      }
      if(element.nurseStatus == 'true'){
        nurseStatus=true;
      }else{
        nurseStatus=false;
      }
      if(element.patientStatus == 'true'){
        patientStatus=true;
      }else{
        patientStatus=false;
      }
      users['id'] = id;
      users['address'] = element.address;
      users['adminStatus'] = adminStatus;
      users['email'] = element.email;
      users['name'] = element.firstName+' '+element.lastName;
      users['nurseStatus'] = nurseStatus;
      users['patientStatus'] = patientStatus;
    });
    this.fireservices.collection('users').doc(id).set(users);
  }
  addMembersPatientData(data,id){
    let patientData={};
    data.forEach(element => {
      patientData['id'] = id;
      patientData['age'] = element.age;
      patientData['cholesterol'] = element.cholesterol;
      patientData['diabetesMelitus'] = element.diabetesMelitus;
      patientData['diastolicBloodPressure'] = element.diastolicBloodPressure;
      patientData['education'] = element.education;
      patientData['employment'] = element.employment;
      patientData['hypertension'] = element.hypertension;
      patientData['income'] = element.income;
      patientData['maritalStatus'] = element.maritalStatus;
      patientData['name'] = element.firstName+' '+element.lastName;
      patientData['sex'] = element.sex;
      patientData['systolicBloodPressure'] = element.systolicBloodPressure;
      patientData['waistToHipRatio'] = element.waistToHipRatio;
      patientData['waistlineCircumference'] = element.waistlineCircumference;
    });
    console.log(patientData);

    this.fireservices.collection('patientData').doc(id).set(patientData);


  }

  editMembersAUTH(data){
    let xx = '['+JSON.stringify(data)+']';
    let yy = JSON.parse(xx);
    let email;
    let password;
    yy.forEach(element => {
      console.log(element.uid);
      this.editMembersPatientData(yy,element.uid);
      this.editMembersUsers(yy,element.uid);
    });
  }
  editMembersPatientData(data,id){
    let patientData={};
    data.forEach(element => {
      patientData['id'] = id;
      patientData['age'] = element.age;
      patientData['cholesterol'] = element.cholesterol;
      patientData['diabetesMelitus'] = element.diabetesMelitus;
      patientData['diastolicBloodPressure'] = element.diastolicBloodPressure;
      patientData['education'] = element.education;
      patientData['employment'] = element.employment;
      patientData['hypertension'] = element.hypertension;
      patientData['income'] = element.income;
      patientData['maritalStatus'] = element.maritalStatus;
      patientData['name'] = element.name;
      patientData['sex'] = element.sex;
      patientData['systolicBloodPressure'] = element.systolicBloodPressure;
      patientData['waistToHipRatio'] = element.waistToHipRatio;
      patientData['waistlineCircumference'] = element.waistlineCircumference;
    });
    this.editCollection('patientData',id,patientData);
  }
  editMembersUsers(data,id){
    let users={};
    let adminStatus;
    let nurseStatus
    let patientStatus
    data.forEach(element => {
      if(element.adminStatus == 'true'){
        adminStatus=true;
      }else{
        adminStatus=false;
      }
      if(element.nurseStatus == 'true'){
        nurseStatus=true;
      }else{
        nurseStatus=false;
      }
      if(element.patientStatus == 'true'){
        patientStatus=true;
      }else{
        patientStatus=false;
      }
      users['id'] = id;
      users['address'] = element.address;
      users['adminStatus'] = adminStatus;
      users['email'] = element.email;
      users['name'] = element.name;
      users['nurseStatus'] = nurseStatus;
      users['patientStatus'] = patientStatus;
    });
    this.editCollection('users',id,users);
  }











  deleteCollection(collection,Record){
    if(Record!=""){
      return this.fireservices.collection(collection).doc(Record).delete();
    }else{
      return this.fireservices.collection(collection).doc(Record).delete();
    }

  }
  /*addToCollection(collection,Record){
    return this.fireservices.collection(collection).add(Record);
  }*/



  addToCollection(collection,Record){
    return this.fireservices.collection(collection).add(Record);
  }

  editCollection(collection,id,JSON){
    this.fireservices.collection(collection).doc(id).update(JSON);
  }

  SignUp(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);

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
