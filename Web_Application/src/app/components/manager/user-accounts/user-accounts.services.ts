import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8082/api/users/';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private http:HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(API_URL + '', { responseType: 'text' });
  }

}
