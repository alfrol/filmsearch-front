import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {AuthenticationService} from '../_services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User;
  editing = false;
  loading = false;
  profileInfoForm: FormGroup;

  public static required(form: FormGroup) {
    const password = form.controls.password;
    const passwordConformation = form.controls.passwordConfirmation;

    if (password.value && !passwordConformation.value) {
      passwordConformation.setErrors({ required: true });
    } else {
      passwordConformation.setErrors(null);
    }
  }

  public static checkPasswords(form: FormGroup) {
    const password = form.controls.password;
    const passwordConfirmation = form.controls.passwordConfirmation;

    if (passwordConfirmation.errors && !passwordConfirmation.errors.noMatch) {
      return;
    }

    if (password.value !== passwordConfirmation.value) {
      passwordConfirmation.setErrors({ noMatch: true });
    } else {
      passwordConfirmation.setErrors(null);
    }
  }

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.buildForm();
    this.getUser();
  }

  /**
   * Get the user information from the database.
   *
   * After the response trigger the {@code buildForm()} method
   * which builds the form based on user data.
   */
  private getUser(): void {
    const CURRENT_USER = this.authenticationService.currentUserValue;
    this.userService.getUserProfile(CURRENT_USER.id).subscribe(user => {
      this.user = user;

      this.profileInfoForm.controls.firstName.setValue(user.firstName);
      this.profileInfoForm.controls.lastName.setValue(user.lastName);
      this.profileInfoForm.controls.age.setValue(user.age);
      this.profileInfoForm.controls.username.setValue(user.username);
      this.profileInfoForm.controls.email.setValue(user.email);
    });
  }

  /** Build the form where the user can see and change their info. */
  private buildForm(): void {
    // Define form controls
    const firstNameCtrl = this.formBuilder.control(
      {value: '', disabled: !this.editing},
      [Validators.required]);

    const lastNameCtrl = this.formBuilder.control(
      {value: '', disabled: !this.editing},
      [Validators.required]);

    const ageCtrl = this.formBuilder.control(
      {value: '', disabled: !this.editing},
      [Validators.required, Validators.min(1), Validators.max(120)]);

    const usernameCtrl = this.formBuilder.control(
      {value: '', disabled: !this.editing},
      [Validators.required]);

    const emailCtrl = this.formBuilder.control(
      {value: '', disabled: !this.editing},
      [Validators.required, Validators.email]);

    // Build the actual form
    this.profileInfoForm = this.formBuilder.group({
      firstName: firstNameCtrl,
      lastName: lastNameCtrl,
      age: ageCtrl,
      username: usernameCtrl,
      email: emailCtrl,
      password: ['', [Validators.minLength(6)]],
      passwordConfirmation: ['']
    }, {validator: [UserProfileComponent.required, UserProfileComponent.checkPasswords]});
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.profileInfoForm.controls[controlName].hasError(errorName);
  }

  /**
   * This method gets triggered by the user when they press on a
   * modify button and either allows the modifications to be done
   * or disables the modification view.
   */
  modify(): void {
    this.editing = !this.editing;

    // Make form controls change "disabled" when this.editing changes
    Object.keys(this.profileInfoForm.controls).forEach(ctrl => {
      const control = this.profileInfoForm.controls[ctrl];

      if (!ctrl.includes('password')) {
        if (this.editing) {
          control.enable();
        } else {
          control.disable();
        }
      }
    });
  }

  onSubmit(): void {
    if (this.profileInfoForm.invalid) {
      return;
    }

    this.loading = true;
    const firstName = this.profileInfoForm.controls.firstName.value;
    const lastName = this.profileInfoForm.controls.lastName.value;
    const age = this.profileInfoForm.controls.age.value;
    const username = this.profileInfoForm.controls.username.value;
    const email = this.profileInfoForm.controls.email.value;
    const password = this.profileInfoForm.controls.password.value;
    const USER = new User(this.user.id, username, password, firstName, lastName, age, email, this.user.token);

    this.userService.updateUserInfo(USER)
      .pipe(first())
      .subscribe(
        () => {
          this.loading = false;
          this.snackBar.open('Successfully Modified', 'OK', { duration: 2000 });
        },
        error => {
          this.loading = false;

          // Show errors to the user
          const ERROR_MESSAGE = error.error.message;
          if (ERROR_MESSAGE.includes('Username')) {
            this.profileInfoForm.controls.username.setErrors({incorrect: ERROR_MESSAGE});
          } else if (ERROR_MESSAGE.includes('Email')) {
            this.profileInfoForm.controls.email.setErrors({incorrect: ERROR_MESSAGE});
          }
        });
  }
}
