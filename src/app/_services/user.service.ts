import {LoginUser, User} from '../_models/user';

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Film} from '../_models/film';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private localApiUrl = 'http://localhost:8000/api/users';
  private serverApiUrl = '/api/users';
  private readonly apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = this.localApiUrl;
  }

  public getWishList(user: User): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiUrl}/wishlist/${user.username}`);
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  public login(user: LoginUser): Observable<LoginUser> {
    return this.http.post<LoginUser>(`${this.apiUrl}/login`, user);
  }

  public logout() {
    this.http.get(`${this.apiUrl}/logout`);
  }

  public getUserProfile(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  public updateUserInfo(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update_user`, user);
  }

  public deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${user.id}`);
  }

  public addFilmToWishList(film: Film): Observable<Film> {
    return this.http.post<Film>(`${this.apiUrl}/add_film`, film);
  }

  public deleteFilmFromWishList(username: string, id: number): void {
    this.http.delete<Film>(`${this.apiUrl}/delete/${username}/${id}`);
  }
}
