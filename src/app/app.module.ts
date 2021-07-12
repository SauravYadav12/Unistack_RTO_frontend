import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FormsModule,ReactiveFormsModule } from'@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AuthHttpInterceptor } from './service/authhttpinterceptor';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthGuard } from './guard/auth.guard';
import { ValidatorService } from './service/validator.service';
import { JWT_OPTIONS,JwtHelperService} from '@auth0/angular-jwt';
import { DashboardModule } from './dashboard/dashboard.module';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    DashboardModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [ValidatorService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true
  }, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  JwtHelperService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
