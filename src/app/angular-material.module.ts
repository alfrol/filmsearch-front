import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule, MatSidenavModule, MatCardModule, MatSnackBarModule} from '@angular/material';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    MatListModule,
    MatToolbarModule,
    CommonModule,
    MatTabsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],

  exports: [
    MatListModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FlexModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSidenavModule,
    MatCardModule,
    MatSnackBarModule
  ],
})
export class AngularMaterialModule {
}
