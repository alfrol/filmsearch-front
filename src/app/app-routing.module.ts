import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FilmsComponent} from './films/films.component';
import {FilmDetailComponent} from './film-detail/film-detail.component';
import {FilmFilterComponent} from './film-filter/film-filter.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {UserWishListComponent} from './user-wish-list/user-wish-list.component';
import {AuthGuard} from './_util/auth.guard';
import {UserProfileComponent} from './user-profile/user-profile.component';


const routes: Routes = [
  { path: 'detail/:id', component: FilmDetailComponent },
  { path: 'filter?genre=:genre', component: FilmFilterComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'wishlist', component: UserWishListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/films', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes,
      { scrollPositionRestoration: 'enabled' }),
    CommonModule,
    RouterTestingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
