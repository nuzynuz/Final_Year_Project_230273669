import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8088/api/';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http:HttpClient) { }

  getUserAccounts(): Observable<any> {
    return this.http.get(API_URL + 'users');
  }
  
  getUser(id:number): Observable<any> {
    return this.http.get(API_URL + 'users/get/'+ id);
  }

  getAll_Col_Regions(): Observable<any> {
    return this.http.get(API_URL + 'c-region');
  }

  getByRegion(role:string, regionId:number): Observable<any> {
    return this.http.get(API_URL + `users/getBy?regionId=${regionId}`);
  }

  getByRegionAndRole(role:string, regionId:number): Observable<any> {
    return this.http.get(API_URL + `users/getBy?role=${role}&regionId=${regionId}`);
  }

  saveRegion(data:any):Observable<any>{
    return this.http.post(API_URL+'c-region',data);
  }

  getMonthlyWeightages(year:number, month:number):Observable<any>{
    return this.http.get(`${API_URL}tag/monthly-sum/${year}/${month}`);
  }

  getWeightagesByYear(year:number):Observable<any>{
    return this.http.get(`${API_URL}tag/year-sum/${year}`);
  }

  getUsersCount():Observable<any>{
    return this.http.get(`${API_URL}users/counts`);
  }

  getFarmers_count_by_regions():Observable<any>{
    return this.http.get(`${API_URL}c-region/farmers_count_by_regions`);
  }

  // getRFID():Observable<any>{
  //   return this.http.get('http://192.168.4.1/header');
  // }
}