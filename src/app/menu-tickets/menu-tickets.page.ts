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
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      document.getElementById('output').innerHTML = dataString;
      this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }


  setDownload(data) {
      //console.log(data);
      let result = data.replace('{" ":[', '[');
      result = result.replace('}]}', '}]');
      //console.log(result);
      let JSONresult  = JSON.parse(result);
      JSONresult.forEach(el => {
        this.crudService.createNewEmplyoee(el);

      });
  }

}
