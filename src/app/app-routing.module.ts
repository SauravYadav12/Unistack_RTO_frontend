import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CustomerComponent } from './dashboard/customer/customer.component';
import { ShowCustomerComponent } from './dashboard/customer/show-customer/show-customer.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { LandingComponent } from './landing/landing.component';
import { UserResolver } from './resolver/user.resolver';

const routes: Routes = [
  
  {
    path:'',
    component: LandingComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'signup',
    component: SignupComponent
  },
  {
    path:'dashboard',
    canActivate: [AuthGuard],
    component:DashboardComponent,
    children:[
      {
        path: '',
        redirectTo:'/dashboard/home',
        pathMatch:'full'
      },
      {
        path:'home',
        component:HomeComponent
      },
      {
      path:'customer',
      component:CustomerComponent,
      },
      {
        path:'customer/update/:id',
        component: CustomerComponent
      },
      {
        path: 'customer/view/:id',
        component: ShowCustomerComponent,
        resolve:{
          user:UserResolver
        }
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
