import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoaderService } from '../page-loader/loader.service';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.scss']
})
export class TopnavbarComponent implements OnInit {

  constructor(
    public loaderSerive:LoaderService,
    private tokenStorageService: TokenStorageService,
    private router:Router,
    private authService:AuthenticationService
     ) { }

  user: any ={};
  role: string ='';

  ngOnInit(): void {
    this.user =  JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  }
  logout(){
    this.authService.
    logout(this.user.email).
    subscribe(
      res=>{console.log(res)},
      err=>{console.log(err)}
    );
    this.tokenStorageService.signOut();

     this.router.navigate(['/login']).then(
       nav =>{
        window.location.reload();
       }
     )
  }

}
