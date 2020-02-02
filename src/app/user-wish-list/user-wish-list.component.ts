import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {SignupComponent} from '../signup/signup.component';
import {AuthenticationService} from '../_services/authentication.service';
import {Film} from '../_models/film';

@Component({
  selector: 'app-user-wish-list',
  templateUrl: './user-wish-list.component.html',
  styleUrls: ['./user-wish-list.component.scss']
})
export class UserWishListComponent implements OnInit {
  films: Film[];
  private current: User;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  private getUser(): void {
    const CURRENT_USER = this.authService.currentUserValue;
    this.userService.getUserProfile(CURRENT_USER.id).subscribe(user => {
      this.current = user;
      this.getWishListFilms();
    });
  }

  private getWishListFilms(): void {
    this.userService.getWishList(this.current).subscribe(films => this.films = films);
  }

  deleteFilmFromWishList(id: number): void {
    this.userService.deleteFilmFromWishList(this.current.username, id);
    window.location.reload();
  }
}
