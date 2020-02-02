import {LoginUser, User} from '../_models/user';

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {UserService} from './user.service';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private readonly currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject ? this.currentUserSubject.value : undefined;
  }

  public login(username: string, password: string): Observable<LoginUser> {
    return this.userService.login({username, password} as LoginUser)
      .pipe(map((user: User) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user as LoginUser;
      }));
  }

  public logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.userService.logout();
  }
}
