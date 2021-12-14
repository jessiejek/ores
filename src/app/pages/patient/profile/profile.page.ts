import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { FormBuilder,Validators  } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { CrudService } from 'src/app/services/crud.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthConstants } from "../../../config/auth-constants";
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  frmPasswordReset;
  userForm;
  /*
  userForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    password: [''],
    address: [''],
    adminStatus: [''],
    nurseStatus: [''],
    patientStatus: [''],
    age: [''],
    cholesterol: [''],
    diabetesMelitus: [''],
    diastolicBloodPressure: [''],
    education: [''],
    employment: [''],
    hypertension: [''],
    income: [''],
    maritalStatus: [''],
    sex: [''],
    systolicBloodPressure: [''],
    waistToHipRatio: [''],
    waistlineCircumference: [''],
    uid: [''],
  });*/
  isDesktop: boolean;

  isDisabled:boolean = true;

  constructor(
    private screensizeService: ScreenSizeService,
    public router:Router,
    private formBuilder: FormBuilder,
    private modalController:ModalController,
    private crudService:CrudService,
    public storageService:StorageService,
    public alertController:AlertController,
    private afAuth: AngularFireAuth,
    private fb: FormBuilder
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }
  selectedSex:string;
  selectedadminStatus:string;
  selectednurseStatus:string;
  selectedpatientStatus:string;
  email;
  ngOnInit() {
    this.selectedadminStatus="";
    this.selectednurseStatus="";
    this.selectedpatientStatus="";
    this.selectedSex="";
    this.userForm = this.formBuilder.group({
      name: [''],
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      address: [''],
      adminStatus: [''],
      nurseStatus: [''],
      patientStatus: [''],
      age: [''],
      cholesterol: [''],
      diabetesMelitus: [''],
      diastolicBloodPressure: [''],
      education: [''],
      employment: [''],
      hypertension: [''],
      income: [''],
      maritalStatus: [''],
      sex: [''],
      systolicBloodPressure: [''],
      waistToHipRatio: [''],
      waistlineCircumference: [''],
      uid: [''],
    });
    this.frmPasswordReset = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });



    this.initializeGetUserInfo();



    if(this.isDisabled){
      this.userForm.disable();
    }else{
      this.userForm.enable();
    }



  }
  initializeGetUserInfo(){
    this.storageService.get(AuthConstants.AUTH).then(
      (res) => {
        console.log('first');



        this.crudService.getUserInfo('patientData',res.uid).subscribe((res)=>{

          let x = JSON.stringify(res);
          let patientData = JSON.parse('['+x+']');
          console.log(patientData);

          console.log(patientData[0].name);

          this.selectedSex = patientData[0].sex;
          this.userForm.controls['age'].setValue(patientData[0].age);
          this.userForm.controls['cholesterol'].setValue(patientData[0].cholesterol);
          this.userForm.controls['diabetesMelitus'].setValue(patientData[0].diabetesMelitus);
          this.userForm.controls['diastolicBloodPressure'].setValue(patientData[0].diastolicBloodPressure);
          this.userForm.controls['education'].setValue(patientData[0].education);
          this.userForm.controls['employment'].setValue(patientData[0].employment);
          this.userForm.controls['hypertension'].setValue(patientData[0].hypertension);
          this.userForm.controls['income'].setValue(patientData[0].income);
          this.userForm.controls['maritalStatus'].setValue(patientData[0].maritalStatus);
          this.userForm.controls['name'].setValue(patientData[0].name);
          this.userForm.controls['uid'].setValue(patientData[0].id);
          this.userForm.controls['systolicBloodPressure'].setValue(patientData[0].systolicBloodPressure);
          this.userForm.controls['waistToHipRatio'].setValue(patientData[0].waistToHipRatio);
          this.userForm.controls['waistlineCircumference'].setValue(patientData[0].waistlineCircumference);
          //this.userForm.controls[res.age].setValue(res.age);
        });

        this.crudService.getUserInfo('users',res.uid).subscribe((res)=>{
          console.log('sikand');
          console.log(res);

          let x = JSON.stringify(res);
          let users = JSON.parse('['+x+']');


          this.selectedadminStatus = users[0].adminStatus.toString();
          this.selectednurseStatus = users[0].nurseStatus.toString();
          this.selectedpatientStatus = users[0].patientStatus.toString();
          this.userForm.controls['email'].setValue(users[0].email);
          this.userForm.controls['address'].setValue(users[0].address);
          this.email = users[0].email;
        });



        //
    })
    .catch((err) => {


    });
  }
  onSubmit(){
    this.crudService.editMembersAUTH(this.userForm.value);
    this.modify();

   }

   modify(){
     this.isDisabled = !this.isDisabled;
     if(this.isDisabled){
      this.userForm.disable();
    }else{
      this.userForm.enable();
    }
   }
   doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  async forgotpassword(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Forgot Password',
      subHeader: this.email,
      message: 'Reset Password?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.frmPasswordReset.controls['email'].setValue(this.email);
            this.crudService.forgotPassword(this.email).then((resp)=>{
              this.modalUpdateV3('Success','Please Check Your Email.',true);

            },
            err => {
             console.log(err);
             this.modalUpdateV3('Error',err,true);
            });

          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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
            if(data){

            }else{

            }

          },
        },
      ],
    });
    await alert.present();
  }
}
