import { Component, OnInit ,Input} from '@angular/core';
import { VariableService } from 'src/app/services/variables/variable.service';
import { AuthConstants, } from "../../config/auth-constants";

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss'],
})
export class PatientDataComponent implements OnInit {
  @Input() patientData: any;
  showBtn:any ;
  constructor(public variable:VariableService) { }

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

