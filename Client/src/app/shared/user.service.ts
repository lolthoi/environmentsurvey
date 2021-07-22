import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  readonly BaseURI = 'https://localhost:44304/api';

  formModel = this.fb.group({
    Username: ['', Validators.required],
    Email: ['', Validators.email],
    LastName: [''],
    FirstName: [''],
    Role: [''],
    Tel: [''],
    NumberId: [''],
    Address: [''],
    Gender: [''],
    Passwords: this.fb.group(
      {
        Password: ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword: ['', Validators.required],
      },
      { validator: this.comparePasswords }
    ),
  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCrtl = fb.get('ConfirmPassword');
    if (
      confirmPswrdCrtl?.errors == null ||
      'passwordMismatch' in confirmPswrdCrtl.errors
    ) {
      if (fb.get('Password')?.value != confirmPswrdCrtl?.value)
        confirmPswrdCrtl?.setErrors({ passwordMismatch: true });
      else confirmPswrdCrtl?.setErrors(null);
    }
  }

  register() {
    var body = {
      Username: this.formModel.value.Username,
      Email: this.formModel.value.Email,
      LastName: this.formModel.value.LastName,
      FirstName: this.formModel.value.FirstName,
      Password: this.formModel.value.Passwords.Password,
      NumberId: this.formModel.value.NumberId,
      Role: this.formModel.value.Role,
      Tel: this.formModel.value.Tel,
      Address: this.formModel.value.Address,
      Gender: this.formModel.value.Gender,
    };
    return this.http.post(this.BaseURI + '/User/Register', body);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/User/Login', formData);
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/User');
  }
}
