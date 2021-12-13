import { Injectable } from '@angular/core';

import { VarConstants, } from "../../config/variable-constants";

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  constructor() { }


  get Cholesterol(): string{
    return VarConstants.Cholesterol;
  }
  get SBP(): string{
    return VarConstants.SBP;
  }
  get LastName(): string{
    return VarConstants.LastName;
  }
  get FirstName(): string{
    return VarConstants.FirstName;
  }
  get Sex(): string{
    return VarConstants.Sex;
  }











}
