import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmSearchComponent } from '../app/film-search/film-search.component';

describe('FilmsSearchComponent', () => {
  let component: FilmSearchComponent;
  let fixture: ComponentFixture<FilmSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
