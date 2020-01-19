import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    
    errorMessage: any;

    constructor(public authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.authService.getJwtToken()){
            request = this.addToken(request, this.authService.getJwtToken());
        }
        console.log("Intercepting the response!");
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    return throwError({errorStatus: error.status, errorMessage: this.errorMessage});
                })
                )
        }
    private addToken(request: HttpRequest<any>, token: string){
        return request.clone({
            setHeaders: {
                'Authorization':`Bearer ${token}`,
                'Content-Type': `application/none` 
            }
        });
    }
}