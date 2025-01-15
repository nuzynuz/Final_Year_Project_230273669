import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/index';
import { User } from '../dtos/user';
import { map } from 'rxjs/internal/operators';
import { HttpClientModule } from '@angular/common/http';
import { supplierSaveDTO } from '../dtos/supplierSaveDTO';

const AUTH_API = 'http://localhost:8088/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
/**
 * Author : SJ.Peeris
 * 
 */
 supplierSaveDTO_: supplierSaveDTO;
  
  isValid:boolean;
  constructor(private http:HttpClient) { }

  login(credentials:any): Observable<any> {
    return this.http.post(AUTH_API+'auth' , {
      email: credentials.username,
      password: credentials.password,
    }, httpOptions);
  }

  logout(email:string): Observable<any> {
    return this.http.post(AUTH_API+ 'users/signout' , {
      email: 'sanjaya@domain.com'
    });
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('auth-token')
    // console.log(!(user === null))
    return !(user === null)
  }

  logOut(){
    sessionStorage.removeItem('user')
  }
}
