import {Component, OnInit} from '@angular/core';
import {Film} from '../_models/film';
import {FilmService} from '../_services/film.service';

@Component
({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: Film[];

  constructor(private filmsService: FilmService) { }

  ngOnInit() {
    this.getFilms();
  }

  /** Add films to the screen. */
  getFilms(): void {
    this.filmsService.getFilms().subscribe(films => this.films = films);
  }

  /**
   * Update films list with filtered films.
   *
   * New films come form {@link FilmFilterComponent}
   * and include only films which genre is equal to
   * the genre selected by the user.
   *
   * @param newFilms Filtered films.
   */
  getFilteredFilms(newFilms: Film[]): void {
    this.films = newFilms;
  }
}
