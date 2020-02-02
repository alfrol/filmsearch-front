import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Film} from '../_models/film';
import {HttpClient} from '@angular/common/http';
import {Genre} from '../_models/genre';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private localApiUrl = 'http://localhost:8000/api/films';
  private serverApiUrl = '/api/films';
  private readonly apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = this.localApiUrl;
  }

  /** GET all films from the API and display them  on the screen. */
  public getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.apiUrl);
  }

  /**
   * GET one film by its ID.
   * @param id: The id of the film.
   */
  public getFilm(id: string): Observable<Film> {
    return this.http.get<Film>(`${this.apiUrl}/detail/${id}`);
  }

  /**
   * Search film by title.
   *
   * @param term: A keyword by which the searching must be done.
   */
  public searchFilms(term: string): Observable<Film[]> {
    // TODO: Add searching by producer.
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Film[]>(`${this.apiUrl}?title=${term}`);
  }

  /** GET all possible genres from the server */
  public getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiUrl}/filter/genres`);
  }
}
