import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;


  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    this.initializeForm();
      
  }
  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['Hello', Validators.required],
      knownAs: ['Hello', Validators.required],
      dateOfBirth: ['Hello', Validators.required],
      city: ['Hello', Validators.required],
      country: ['Hello', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassowrd'].updateValueAndValidity()
    })
  }

  matchValues(matchTo:string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }

  register() {
    const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
    const values = {...this.registerForm.value,dateOfBirth:dob}
    this.accountService.register(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/members')
      },
      error: error => {
        this.validationErrors = error;
      }
    })
  }

  cancel() {
    this.cancelRegister.emit(false)
  }

  private getDateOnly(dob: string|undefined) {
    if (!dob) return;
    let theDob = new Date(dob)
    return new Date(theDob.setMinutes(theDob.getMinutes()-theDob.getTimezoneOffset())).toISOString().slice(0,10)

  }

}
