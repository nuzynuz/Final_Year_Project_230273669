import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs/index';
import { AuthenticationService } from './authentication.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { LoaderService } from '../components/user-common/page-loader/loader.service';
import { finalize } from 'rxjs/internal/operators';

//const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
 const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
 
  
  constructor(
    private token: TokenStorageService,
    public loaderService:LoaderService
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // this.loaderService.isLoading = true;
 
    let authReq = request;
    const token = this.token.getToken();

    if (token != null) {
      // for Spring Boot back-end
      //authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

      // for Node.js Express back-end
      authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, token) });
      return next.handle(authReq).pipe(
        finalize(
          ()=>{
          //  this.loaderService.isLoading=false;
          }
        )
      );
    }
    return next.handle(request);
  }
}