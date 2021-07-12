import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JwtHelperService} from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';


interface SignedinResponse{
  authenticated: boolean;
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  authToken: any;
  user: any;
  username:any;
  role: any;
  backendUrl = 'https://indostar-backend.herokuapp.com/users';
  isLoggedIn = new BehaviorSubject<any>(null);

  // private userRole = new BehaviorSubject<any>(null);
  // newRole = this.userRole.asObservable()

  constructor(private http: HttpClient, private jwtHelper:JwtHelperService) {}

  //  getUserRole(newRole:any){
  //    return this.userRole.next(newRole)
  // }

  //FUNCTION Sign up 
  signup(user:any){
  
    return this.http.post<any>(`${this.backendUrl}/signup`, user).pipe(
      tap(res=>res)
    )
    
  }

  //FUNCTION Login 
  login(user:any){

    return this.http.post<any>(`${this.backendUrl}/login`,user).pipe(
      tap(res=>{
        console.log(res);
        if(res.user){
          this.role = res.user.role
          this.isLoggedIn.next(true);
        }
        else{
          console.log("Something went Wrong");
        }

      })
    )
  }

  //FUNCTION Storing token in Local storage
  storeUserData(token:any, user:any, role:any){

    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role',JSON.stringify(role));

    this.authToken = token;
    this.user = user;
    this.role = role;
  }


  //FUNCTION Log Out 
  logout(){

    this.authToken = null;
    this.user = null;
    this.isLoggedIn.next(false);
    localStorage.clear();
  }

  //FUNCTION Get dashboard
  getDashboard(){
   
    this.loadToken();
    // console.log(this.authToken)
    return this.http.get<any>(`${this.backendUrl}/dashboard`).pipe(
      tap(res=>{
        // console.log(res.user.name)
        this.username = res.user.name;
        this.role = res.user.role;
        this.isLoggedIn.next(true);
        
      } )
    )

  }

  //FUNCTION Load token from local storage
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadRole(){
    const role = localStorage.getItem('role');
    return this.role = role;
  }
  //FUNCTION get Username
  getUsername(){
    return this.username;
  }

  //Function to get role

  getRole(){
    return this.role;
  }


  //FUNCTION Validate login
  validate(){
    this.loadToken();
    return this.http.get<SignedinResponse>(`${this.backendUrl}/validate`).pipe(
      tap(({authenticated})=>{
        
        this.isLoggedIn.next(authenticated);
      })
    )
  }


}
