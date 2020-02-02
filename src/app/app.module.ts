import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilmsComponent } from './films/films.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FilmSearchComponent } from './film-search/film-search.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import {FilmFilterComponent} from './film-filter/film-filter.component';
import {RouterTestingModule} from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import {AngularMaterialModule} from './angular-material.module';
import { MatSliderModule } from '@angular/material/slider';
import {MatSidenavModule, MatTooltipModule} from '@angular/material';
import {MatToolbarModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { UserWishListComponent } from './user-wish-list/user-wish-list.component';
import {JwtInterceptor} from './_util/JwtInterceptor';
import {UserProfileComponent} from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    FilmSearchComponent,
    FilmDetailComponent,
    FilmFilterComponent,
    UserComponent,
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    HeaderComponent,
    SidenavListComponent,
    UserWishListComponent,
    UserProfileComponent
  ],

    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule.forRoot([]),
        RouterTestingModule,
        ReactiveFormsModule,
        MatSliderModule,
        MatSidenavModule,
        MatToolbarModule,
        AngularMaterialModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatTooltipModule
    ],

  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
  }],

  exports: [
    MatToolbarModule,
    FilmsComponent,
    MatSidenavModule
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
