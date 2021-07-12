import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { FormsModule,ReactiveFormsModule } from'@angular/forms';
import { ShowCustomerComponent } from './customer/show-customer/show-customer.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    CustomerComponent,
    HomeComponent,
    ShowCustomerComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
