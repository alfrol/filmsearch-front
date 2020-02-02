import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Genre} from '../_models/genre';
import {Film} from '../_models/film';
import {FilmService} from '../_services/film.service';

// @ts-ignore
@Component({
  selector: 'app-film-filter',
  templateUrl: './film-filter.component.html',
  styleUrls: ['./film-filter.component.css']
})
export class FilmFilterComponent implements OnInit {
  allGenres: Genre[];
  private selectedGenres: Genre[] = [];
  private films: Film[] = [];
  @Output() private emitter: EventEmitter<Film[]> = new EventEmitter<Film[]>();

  constructor(private filmsService: FilmService) {}

  ngOnInit() {
    this.filmsService.getAllGenres().subscribe(genres => this.allGenres = genres);
    this.filmsService.getFilms().subscribe(films => this.films = films);
  }

  /**
   * Filter films by selected genres.
   *
   * @param genre Selected genre to be considered while filtering.
   * @param button A button which holds the value of specified genre.
   */
  public filterByGenre(genre: Genre, button: HTMLLIElement): void {
    if (button.className.includes('selected')) {
      button.className = '';
      this.selectedGenres = this.selectedGenres.filter(g => g.value !== genre.value);
    } else {
      button.className = 'selected';
      this.selectedGenres.push(genre);
    }

    const filteredFilms: Film[] = this.films.filter(f => {
      return this.selectedGenres.map(g => g.value).includes(f.genre);
    });
    this.emitter.emit(filteredFilms.length > 0 ? filteredFilms : this.films);
  }

}
