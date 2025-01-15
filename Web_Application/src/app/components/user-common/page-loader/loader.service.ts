import { Injectable } from '@angular/core';
import { BehaviorSubject,  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  //temporary disabled/commented at the auth-interceptor cervice.ts
  //If it is going to enable add MatProgressBarModule in the app.module.js
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
 
  constructor() {

   }
   
}
