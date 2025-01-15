import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
/**
 * Author : SJ.Peeris
 * 
 */

  constructor(
    private router:Router,
    private authService: AuthenticationService
  ) { }

  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.authService.isUserLoggedIn())
    return true;
    //else part
    this.router.navigate(['']);
    return false;
  }

}
