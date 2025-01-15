import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8088/api/';

@Injectable({
  providedIn: 'root'
})
export class CoordinatorService {

  constructor(private http:HttpClient) { }

  getUsers(userid:string,role:string): Observable<any> {
    return this.http.get(`${API_URL}coordinator/getUsers/${role}/${userid}`);
  }

  getMyRegionId(userid:string): Observable<any> {
    return this.http.get(`${API_URL}coordinator/getMyRegionId/${userid}`);
  }

  getAdvanceReq(colRegionId:string): Observable<any>{
    return this.http.get(`${API_URL}advance/getByRegion/${colRegionId}`)
  }
}