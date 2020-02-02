import {TestBed, inject} from '@angular/core/testing';

import { FilmService } from '../app/_services/film.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Film} from '../app/_models/film';

describe('FilmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FilmService]
    });
  });

  it('initialised', inject([FilmService], (filmService: FilmService) => {
    expect(filmService).toBeTruthy();
  }));

  it('FilmGenreTest',
    inject([HttpTestingController, FilmService], (httpMock: HttpTestingController, service: FilmService) => {
      service.getFilm('12').subscribe((film: Film) => {
        expect(film.genre).toBe('Horror');
      });
      const req = httpMock.expectOne('http://localhost:8000/api/films');
      console.log(req.request);
      expect(req.request.method).toEqual('GET');
      req.flush({genre: 'Horror'});
      httpMock.verify();
      })
  );


  it('FilmPlotTest',
    inject([HttpTestingController, FilmService], (httpMock: HttpTestingController, service: FilmService) => {
      let plotTest = '';
      service.getFilm('12').subscribe((film: Film) => {
          expect(film.plot).not.toBeNull();
          plotTest = film.plot;
      });
      const req = httpMock.expectOne('http://localhost:8000/api/films');
      expect(req.request.method).toEqual('GET');
      req.flush({plot : plotTest});
      httpMock.verify();
      })
  );

  it('SearchFilmByTitle',
    inject([HttpTestingController, FilmService], (httpMock: HttpTestingController, service: FilmService) => {
      let filmFound = false;
      let id = 10;

      service.searchFilms('The Matrix').subscribe((filmList: Film[]) => {
        filmList.forEach(film => {

          if (film.title === 'The Matrix') {
            filmFound = true;
            id = film.id;
          }
        });
        expect(filmFound).toBeTruthy();
      });

      const req = httpMock.expectOne('http://localhost:8000/api/films/detail' + id);
      expect(req.request.method).toEqual('GET');
      req.flush({title : 'The Matrix'});
      httpMock.verify();
    })
  );

  it('FilmReleasedDataRatingTest',
    inject([HttpTestingController, FilmService], (httpMock: HttpTestingController, service: FilmService) => {
      service.getFilm('12').subscribe((film : Film) => {
        expect(film.releaseDate).toBe(1987);
      });
      const req = httpMock.expectOne('http://localhost:8000/api/films/detail/12');
      expect(req.request.method).toEqual('GET');
      req.flush({releaseDate : 1987});
      httpMock.verify();
    })
  );

  it('FilmProducerTest',
    inject([HttpTestingController, FilmService], (httpMock: HttpTestingController, service: FilmService) => {
      service.getFilm('12').subscribe((film: Film) => {
        expect(film.producer).toBe('Sam Raimi');
      });
      const req = httpMock.expectOne('http://localhost:8000/api/films/detail/12');
      expect(req.request.method).toEqual('GET');
      req.flush({producer : 'Sam Raimi'});
      httpMock.verify();
    })
  );

  it('FilmAgeRatingTest',
    inject([HttpTestingController, FilmService], (httpMock: HttpTestingController, service: FilmService) => {
      service.getFilm('12').subscribe((film: Film) => {
        expect(film.ageRating).toBe('Prohibited for under 16 unless accompanied by an adult');
      });
      const req = httpMock.expectOne('http://localhost:8000/api/films/detail/12');
      expect(req.request.method).toEqual('GET');
      req.flush({ageRating : 'Prohibited for under 16 unless accompanied by an adult'});
      httpMock.verify();
    })
  );

  it('FilmDurationTest',
    inject([HttpTestingController, FilmService], (httpMock: HttpTestingController, service: FilmService) => {
      service.getFilm('12').subscribe((film: Film) => {
        expect(film.duration).toBe(84);
      });
      const req = httpMock.expectOne('http://localhost:8000/api/films/detail/12');
      expect(req.request.method).toEqual('GET');
      req.flush({duration : 84});
      httpMock.verify();
    })
  );
});
