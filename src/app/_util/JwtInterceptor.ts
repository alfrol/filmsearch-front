import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AuthenticationService} from '../_services/authentication.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | undefined {
    const CURRENT_USER = this.authenticationService.currentUserValue;

    if (CURRENT_USER && CURRENT_USER.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${CURRENT_USER.token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.authenticationService.logout();
          this.router.navigate(['/login']);
        }
        return of(undefined);
      })
    );
  }
}
