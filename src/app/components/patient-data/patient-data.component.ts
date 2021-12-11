import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss'],
})
export class PatientDataComponent implements OnInit {
  @Input() patientData: any;
  showBtn:any ;
  constructor() { }

  ngOnInit() {}
  showHide(id){
    console.log(this.showBtn +' | '+id);

    if(this.showBtn == id){
      this.showBtn="";
    }else{
      this.showBtn = id;
    }

  }
}
