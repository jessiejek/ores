import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { AESEncryptDecryptServiceService } from 'src/app/services/encryption/aesencrypt-decrypt-service.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthConstants } from "../../config/auth-constants";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validationUserMessage ={
    email:[
      {type:"required", message:"Please enter your Email"},
      {type:"pattern", message:"The Email entered is Incorrect.Try again"}
    ],
    password:[
      {type:"required", message:"please Enter your Password!"},
      {type:"minlength", message:"The Password must be at least 5 characters or more"}

    ]
  }
  validationFormUser: FormGroup;
  isDesktop: boolean;
  constructor(
    public formbuider: FormBuilder,
    private router: Router,
    private nav: NavController,
    private crudService:CrudService,
    private firestore: AngularFirestore,
    private screensizeService: ScreenSizeService,
    public aes:AESEncryptDecryptServiceService,
    public storageService:StorageService,
    ) {
      this.screensizeService.isDesktopView().subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          window.location.reload();
        }
        this.isDesktop = isDesktop;
        ////console.log(this.isDesktop );
      });
    }


    ngOnInit() {



      this.validationFormUser = this.formbuider.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ]))
      })

      }

      LoginUser(value){
        ////console.log("Am logged in");
        try{
           this.crudService.loginFireauth(value).then( resp =>{

          //  this.router.navigate(['tabs'])

           if(resp.user){


             /*this.crudService.setUser({
               username : resp.user.displayName,
               uid: resp.user.uid
             });*/
             let record = {};
             console.log(resp.user.uid);

             this.crudService.getUserInfo('users',resp.user.uid).subscribe(
              res=>{
                let x = JSON.stringify(res);
                let parsedData = JSON.parse('['+x+']');
               if(parsedData){
                  record['address'] = parsedData[0].address;
                  record['adminStatus'] = parsedData[0].adminStatus;
                  record['name'] = parsedData[0].name;
                }

              }
              );
             record['email'] = resp.user.multiFactor.user.email;
             record['uid'] = resp.user.multiFactor.user.uid;
             record['accessToken'] = resp.user.multiFactor.user.accessToken;
            const userProfile = this.firestore.collection('profile').doc(resp.user.uid);
             userProfile.get().subscribe( result=>{
              if(result.exists){
                this.storageService.store(AuthConstants.AUTH, JSON.stringify(record));
                this.nav.navigateForward(['menu']);
              }else{
              }
             })
           }


           })
        }catch(err){
          console.log(err);
        }
      }



    /*
  checkInput() {

    let record = {};
    record['name'] = this.name;
    record['age'] = this.age;
    record['location'] = this.location;
    //this.crudservice.
    this.crudservice.createNewEmplyoee(record).then(res =>{

      this.view();
    }).catch(error =>{
      ////console.log(error);
    });
  }
  view(){
    this.crudservice.getEmployee().subscribe(
      res => {
        ////console.log(res);
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
























  gotoLoginpage(){
    //this.nav.navigateForward(['loginscreen']);
  }

  registerUser(){
    //this.nav.navigateForward(['signup'])
  }

  loginwithFacebook(){


  }




  googlePlusLogin(){

  }



*/



}
