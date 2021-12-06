import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public folder: string;
  darkMode:boolean = true;
  constructor(private activatedRoute: ActivatedRoute, public render:Renderer2) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  darkmode(){
    let color;
    this.darkMode = !this.darkMode;
    if(this.darkMode){
      console.log('true');
      color = 'light';
    }else{
      console.log('false');
      color='dark';
    }
    console.log(color);

    this.render.setAttribute(document.body, 'prefers-color-scheme', color);
  }
}
