import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
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
  credentials: FormGroup;
  constructor(public crudservice:CrudService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController) { }


  ngOnInit() {
    this.view();
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    await loading.dismiss();
    /*
    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.error,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );*/
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
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
