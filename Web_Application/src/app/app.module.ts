import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/user-common/login/login.component';
import { FoggetPasswordComponent } from './components/user-common/fogget-password/fogget-password.component';
import { FooterComponent } from './components/user-common/footer/footer.component';

import { PagecontainerComponent } from './components/user-common/pagecontainer/pagecontainer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
//Environment
import { environment } from "../environments/environment";

import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { ManagerModule } from './components/manager/manager.module';
import { DatalistComponent } from './components/datalist/datalist.component';
import { SlidebarComponent } from './components/user-common/slidebar/slidebar.component';
import { TopnavbarComponent } from './components/user-common/topnavbar/topnavbar.component';
import { CoordinatorModule } from './components/coordinator/coordinator.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FoggetPasswordComponent,
    FooterComponent,
    PagecontainerComponent,
    DatalistComponent,
    SlidebarComponent,
    TopnavbarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ManagerModule,
    CoordinatorModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
    },
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
