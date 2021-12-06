import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }
  checkInput() {
    console.log(this.postData);

  }
}
