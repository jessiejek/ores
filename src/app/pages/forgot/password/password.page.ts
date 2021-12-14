import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Alert } from 'selenium-webdriver';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  frmSetNewPassword = this.fb.group({
    password: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required]]
  });
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private crudService:CrudService,
    public alertController:AlertController) {}
  todo = {
      title:'',
      description:''
    }
    mode;
    code;
    password;
  logForm() {
    console.log(this.todo);
    this.password = this.todo.description;
    this.mode = this.route.snapshot.queryParams['mode'];
    console.log(this.mode);
    this.code = this.route.snapshot.queryParams['oobCode'];
    console.log(this.code);
    const password = this.frmSetNewPassword.controls['password'].value;
    const confirmPassword = this.frmSetNewPassword.controls['confirmPassword'].value;
    this.crudService.resetPassword(this.code,this.password).then((resp)=>{
      console.log(resp);
      this.router.navigate(['/login']);
    },
    err => {
     console.log(err);
      this.modalUpdateV3('Error',err,false);
    });
  }
  ngOnInit() {

  }
  async modalUpdateV3(header, message, data) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await alert.present();
  }
}
