import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Film} from '../_models/film';
import {FilmService} from '../_services/film.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-film-search',
  templateUrl: './film-search.component.html',
  styleUrls: ['./film-search.component.css']
})
export class FilmSearchComponent implements OnInit {
  films: Observable<Film[]>;
  private searchTerms = new Subject<string>();

  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.films = this.searchTerms.pipe(
      // Wait 350ms before considering the term.
      debounceTime(350),

      // Keep only unique terms.
      distinctUntilChanged(),

      // Consider the next term if it changes.
      switchMap((term: string) => this.filmService.searchFilms(term))
    );
  }

  /**
   * Search films by terms that are being typed in by the user.
   *
   * @param nextTerm The next term to consider.
   *                 Changes while the user is typing.
   */
  search(nextTerm: string): void {
    this.searchTerms.next(nextTerm);
  }

  /**
   * Clear search results when being redirected to the film detail view.
   *
   * Remove the results list and empty the input area.
   * @param searchBox The input are where the user types the terms.
   */
  clearSearch(searchBox: HTMLInputElement): void {
    searchBox.value = '';
    this.searchTerms.pipe(debounceTime(0), distinctUntilChanged());
    this.search('');
  }
}
