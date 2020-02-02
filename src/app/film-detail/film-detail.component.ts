import {Component, OnInit} from '@angular/core';
import {Film} from '../_models/film';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FilmService} from '../_services/film.service';
import {Location} from '@angular/common';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../_services/user.service';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {
  film: Film;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmService: FilmService,
    private userService: UserService,
    private location: Location,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getFilm();
  }

  /**
   * Get film from the database.
   *
   * The {@code id} of the film is read from the route snapshot
   * and then passed to {@link FilmService.getFilm()} method.
   */
  private getFilm(): void {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.filmService.getFilm(params.get('id'))))
      .subscribe(film => this.film = film);
  }

  /**
   * Get film duration as string.
   *
   * String is required to show the duration to the user in a nice way,
   * not as a one number.
   *
   * @param film Film object.
   */
  getFilmDurationAsString(film: Film): string {
    return `${Math.floor(film.duration / 60)}h ${film.duration % 60}`;
  }

  addFilmToWishList(): void {
    this.userService.addFilmToWishList(this.film).subscribe(d => console.log(d));
  }

  public get authentication() {
    return this.authenticationService;
  }

  /**
   * Go back to the previous page from film detail view.
   */
  goBack(): void {
    this.location.back();
  }
}



