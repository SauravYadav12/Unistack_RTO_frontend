import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  isLoggedIn : BehaviorSubject<Boolean>

  constructor(private authService: AuthService){
    this.isLoggedIn = this.authService.isLoggedIn;
      // console.log(this.isLoggedIn);
  }

  ngOnInit(): void{
    this.authService.validate().subscribe((val)=>{
      // console.log(val.authenticated);
    })
  }
}
