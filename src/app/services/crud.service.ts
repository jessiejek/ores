import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservices:AngularFirestore) { }

  createNewEmplyoee(Record){

//this.fireservices.collection('Employee').get();
    return this.fireservices.collection('Employee').add(Record);
  }
  getEmployee(){
    //return this.fireservices.collection('Employee').valueChanges();
    /*this.fireservices.collection('Employee').get().subscribe((snaphot) =>{
      console.log(snaphot.docs);

    });*/
    //return this.fireservices.collection('Employee').valueChanges();
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
