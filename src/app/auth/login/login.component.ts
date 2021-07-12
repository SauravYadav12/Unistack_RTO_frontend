import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidatorService } from '../../service/validator.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string | undefined;
  password: string | undefined;
  loading: boolean = false;

  constructor(private authService: AuthService, 
              private router: Router,
              private validateService:ValidatorService,
              private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onLogin():any{
    let user = {
      email: this.email,
      password: this.password
    }

    this.loading = !this.loading;
    //Required Fields
    if(!this.validateService.validateLogin(user)){ 
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

    // Sending and receiving response
    this.authService.login(user).subscribe({
      next: data => {
        if(data.success){
          this.authService.storeUserData(data.token, data.user, data.role);
          this.toastr.success("Login Successfull");
          this.loading = !this.loading;
          this.router.navigateByUrl('/dashboard');
        } 
        else{
          
          this.loading = !this.loading;
          this.toastr.error(data.message);
          this.router.navigateByUrl('/login');
        }
      },

      error: (error)=>{
        
        if(error.status === 0){
          this.loading = !this.loading;
          this.toastr.error("Could not connect to server, Please Check your connection!");
          this.router.navigateByUrl('/login');
        }
      }
     
    })
  }
}
