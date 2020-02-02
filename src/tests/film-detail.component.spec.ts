import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { FilmDetailComponent } from '../app/film-detail/film-detail.component';

describe('FilmDetailComponent', () => {
  let component: FilmDetailComponent;
  let fixture: ComponentFixture<FilmDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilmDetailComponent],
      providers: [FilmDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
