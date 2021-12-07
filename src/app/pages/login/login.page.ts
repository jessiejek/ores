import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';

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
    private screensizeService: ScreenSizeService
    ) {
      this.screensizeService.isDesktopView().subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          window.location.reload();
        }
        this.isDesktop = isDesktop;
        console.log(this.isDesktop );
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
        console.log("Am logged in");
        try{
           this.crudService.loginFireauth(value).then( resp =>{

          //  this.router.navigate(['tabs'])

           if(resp.user){

             this.crudService.setUser({
               username : resp.user.displayName,
               uid: resp.user.uid
             })
             console.log(resp.user.multiFactor.user);
             console.log(resp.user.multiFactor.user.email);
            const userProfile = this.firestore.collection('profile').doc(resp.user.uid);


             userProfile.get().subscribe( result=>{




              if(result.exists){
                console.log('tabs');
                this.nav.navigateForward(['menu']);
              }else{

                this.firestore.doc(`profile/${this.crudService.getUID()}`).set({
                  name: resp.user.displayName,
                  email: resp.user.email
                });

                 //this.nav.navigateForward(['uploadimage']);
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
