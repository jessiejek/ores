import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  name:any;
  age:any;
  id:any;
  location:any;
  list:any;
  constructor(public crudservice:CrudService) { }

  ngOnInit() {
    this.view();
  }
  checkInput() {

    let record = {};
    record['name'] = this.name;
    record['age'] = this.age;
    record['location'] = this.location;
    //this.crudservice.
    this.crudservice.createNewEmplyoee(record).then(res =>{

      this.view();
    }).catch(error =>{
      console.log(error);
    });
  }
  view(){
    this.crudservice.getEmployee().subscribe(
      res => {
        console.log(res);
        this.list = res;
      });
  }
  checkInput1() {
    this.view();
  }
  update(){
    this.crudservice.updateEmployee(this.id);
    this.view();
  }
  delete(id){
    this.crudservice.deleteEmployee(id);
  }
}
