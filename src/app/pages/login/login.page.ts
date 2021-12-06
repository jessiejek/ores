import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public postData = {
    username: '',
    password: '',
    // username: 'PGALBO',
    // password: '@Dell150790',
  };
  constructor(public crudservice:CrudService) { }

  ngOnInit() {
  }
  checkInput() {
    console.log(this.postData);
    let record = {};
    record['name'] = this.postData.username;
    record['password'] = this.postData.password;
    //this.crudservice.
    this.crudservice.createNewEmplyoee(record).then(res =>{
      console.log(res);
    }).catch(error =>{
      console.log(error);

    })


  }
}
