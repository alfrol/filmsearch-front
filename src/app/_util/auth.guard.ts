import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  /**
   * Decide whether some route can be activated by the user.
   *
   * If the user is not logged in, they have to login first.
   * After the login user is redirected to the page they requested
   * before the redirection to login page.
   *
   * @param route - Requested route.
   * @param state - Where to redirect after authentication.
   * @return boolean - true if user can access this route, false otherwise.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
