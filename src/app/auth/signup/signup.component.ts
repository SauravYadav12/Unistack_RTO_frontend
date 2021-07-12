import { Component, OnInit } from '@angular/core';
import { ValidatorService } from '../../service/validator.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name: any;
  email: any;
  password: any;
  corpName: any;
  loading: boolean = false;

  constructor(private validateService: ValidatorService,
              private toastr: ToastrService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
  }

  onSignup():any{
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      corpName: this.corpName
    }

    console.log(user);
    this.loading = !this.loading;
    //Required Fields
    if(!this.validateService.validateSignup(user)){
      this.toastr.error("Please fill in all the Fields");
      this.loading = !this.loading;
      return false;
    }

    // Validate Email 
    if(!this.validateService.validateEmail(user.email)){
      this.toastr.error("Please enter a valid email");
      this.loading = !this.loading;
      return false;
    }

    // Register User
    this.authService.signup(user).subscribe(data => {
      if(data.success){
        console.log(data);
        this.toastr.success("Successfully Registered, Please Login");
        this.loading = !this.loading;
        this.router.navigateByUrl('/login');
      }
      else{
        this.toastr.error(data.message);
        this.loading = !this.loading;
        console.log("something went wrong")
      }
    })

  }
}
