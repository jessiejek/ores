import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public folder: string;
  darkMode:boolean = true;
  constructor(private activatedRoute: ActivatedRoute, public render:Renderer2,private nav: NavController) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }


  gotoLoginpage(){
    this.nav.navigateForward(['login']);
  }

  registerUser(){
    //this.nav.navigateForward(['signup'])
  }

  loginwithFacebook(){


  }




  googlePlusLogin(){

  }


}
