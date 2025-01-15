import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
/**
 * Author : SJ.Peeris
 */

  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string='';

  constructor(
    private tokenStorage:TokenStorageService,
    private authService:AuthenticationService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required]),
      'password' : new FormControl(null, [Validators.required])
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;   
    }
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data.user);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = data.user.role;
        this.loginForm.reset();
        let routerLink ='';
        
       switch(this.role){
         case 'factory-manager':  routerLink = '/manager/dashboard';
         break;
         case 'coordinater':  routerLink = '/coordinator/dashboard';
         break;
         default:  routerLink='';
       }
    
      this._router.navigate([routerLink]).then(nav=>{
        window.location.reload();
      })
      },
      err => {
        this.errorMessage = 'Invalid Credentials!';
        this.isLoginFailed = true;
      }
    );
  }

  clicksub(){
    this.loginForm.reset();
  }
  get f()
  {
      return this.loginForm.controls;
  }

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

}
