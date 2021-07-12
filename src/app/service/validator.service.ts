import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  
  // Validate signup details
  validateSignup(user:any){
    if(user.name == undefined || 
      user.password == undefined ||
      user.email == undefined ||
      user.corpName == undefined){
        return false
      } else {
        return true;
      }
  }

  validateLogin(user:any){
    if(user.password == undefined ||
      user.email == undefined )
      {
        return false
      } else {
        return true;
      }
  }

  // Validate Email
  validateEmail(email:any){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
}
