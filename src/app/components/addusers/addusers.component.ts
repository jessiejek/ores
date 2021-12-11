import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators  } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-addusers',
  templateUrl: './addusers.component.html',
  styleUrls: ['./addusers.component.scss'],
})
export class AddusersComponent implements OnInit {
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

  });

  constructor(
    private formBuilder: FormBuilder,
    private modalController:ModalController,
    private crudService:CrudService ) { }
  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  ngOnInit() {
    this.userForm = this.formBuilder.group({
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
    });
  }
  onSubmit(){
   this.crudService.addMembersAUTH(this.userForm.value);
   this.userForm.reset;
   this.closeModal();
  }

}
