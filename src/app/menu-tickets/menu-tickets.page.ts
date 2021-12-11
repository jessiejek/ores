import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { CrudService } from '../services/crud.service';
import { ScreenSizeService } from '../services/screen-size/screen-size.service';
@Component({
  selector: 'app-menu-tickets',
  templateUrl: './menu-tickets.page.html',
  styleUrls: ['./menu-tickets.page.scss'],
})
export class MenuTicketsPage implements OnInit {
  isDesktop: boolean;
  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;
  userName:any;
  password:any;
  constructor(
    private screensizeService: ScreenSizeService,
    public router: Router,
    private crudService: CrudService) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }
  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  ngOnInit() {
    //this.crudService.createNewEmplyoee('1');
    let record = {};
    record['name'] = '1';
    record['age'] = '2';
    record['location'] = '3';
    //this.crudservice.
   // this.crudService.createNewEmplyoee(record);
  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    console.log(file);

    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
     // document.getElementById('output').innerHTML = dataString;
      this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }
  overwriteAppend:any;
  segmentChanged(data){
    console.log(this.overwriteAppend);

  }

  setDownload(data) {
      //console.log(data);
      let result = data.replace('{" ":[', '[');
      result = result.replace('}]}', '}]');
      //console.log(result);
      let JSONresult  = JSON.parse(result);
      JSONresult.forEach(el => {
       // this.crudService.createNewEmplyoee(el);
          this.crudService.addToCollection('testAdd4',el);

      });
  }
  arrayBuffer: any;
  file: File;
  JSONObject = {
    object: {},
    string: ''
  };
  incomingfile(event) {
    this.file = event.target.files[0];
  }
  upload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      const JSON_Object = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      this.JSONObject.object = JSON_Object; //Data in JSON Format
      this.JSONObject.string = JSON.stringify(JSON_Object); //Data in String Format


      this.uploadToFirebase(this.JSONObject.object);
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadToFirebase(data) {

    //this.crudService.addToCollection('testAdd4',data);

    var itemsProcessed = 0;
   data.forEach(el => {
     this.crudService.addToCollection('testAdd4',el);
     //console.log('el');
     if(itemsProcessed === data.length) {
      this.JSONObject = {
        object: {},
        string: ''
      };
    }
    });


    //setTimeout(() => { window.location.reload(); }, 2000);
  }
  addUser(){
    this.crudService.SignUp(this.userName,this.password);
  }


}
