import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmFilterComponent } from '../app/film-filter/film-filter.component';

describe('FilmFilterComponent', () => {
  let component: FilmFilterComponent;
  let fixture: ComponentFixture<FilmFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
