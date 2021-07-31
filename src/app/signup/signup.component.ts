import { Component, OnInit } from '@angular/core';
import { HelpersService } from '../config/helpers.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../config/api.service';
import { AuthService } from '../config/auth.service';
import { TokenService } from '../config/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    receiveUpdates: [''],
  });

  hasError = false;
  emailAvailable = true;
  usernameAvailable = true;
  emailPresent = false;
  step = 1;
  passwordMin: boolean;
  passwordUpper: boolean;
  passwordLower: boolean;
  passwordNum: boolean;
  passwordSC: boolean;
  isValid: boolean;

  constructor(
    private helpers: HelpersService,
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private tokenService: TokenService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.helpers.goBack()
  }

  checkEmail() {
    if (this.signUpForm.controls.email.valid && this.emailAvailable) {
      return false
    } else {
      return true
    }
  }

  checkUsername() {
    if (this.signUpForm.controls.username.valid && this.usernameAvailable) {
      return false
    } else {
      return true
    }
  }

  checkPassword() {
    const password = this.signUpForm.value.password;
    this.passwordNum = password.match(/\d+/g) === null ? false : true;
    this.passwordMin = password.split('').length >= 8 ? true : false;
    this.passwordLower = (/[a-z]/.test(password))
    this.passwordUpper = (/[A-Z]/.test(password))
    this.passwordSC = (/[(@!#\$%\^\&*\)\(+=._-]/g.test(password))
    if (this.passwordNum && this.passwordMin && this.passwordLower && this.passwordUpper && this.passwordSC && this.signUpForm.valid) {
      this.isValid = true
    } else {
      this.isValid = false
    }
  }

  emailUniq() {
    this.hasError = false;
    const email = this.signUpForm.value.email;
    if (this.signUpForm.controls.email.valid) {
      this.api.checkEmail(email).subscribe(
        data => {
          this.emailAvailable = data['available'];
        }
      )
    }
  }

  usernameUniq() {
    const username = this.signUpForm.value.username;
    if (this.signUpForm.controls.username.valid) {
      this.api.checkEmail(username).subscribe(
        data => {
          this.usernameAvailable = data['available'];
        }
      )
    }
  }

  nextStep() {
    this.step += 1;
  }

  onSubmit() {
    this.auth.register(this.signUpForm.value).subscribe(
      data => {
        this.tokenService.saveUser(data['user']);
        this.tokenService.saveToken(data['jwt']);
        this.router.navigate(['/']);
      },
      err => this.hasError = true
    )
  }
  
  toggleVisibility(event, id) {
    const element = event.currentTarget;
    const icon = element.querySelector('i');
    const input = document.getElementById(id);
    if (icon.classList.contains('fa-eye-slash')) {
      icon.classList.remove('fa-eye-slash')
      icon.classList.add('fa-eye')
      input.setAttribute('type', 'text')
    } else {
      icon.classList.add('fa-eye-slash')
      icon.classList.remove('fa-eye')
      input.setAttribute('type', 'password')
    }
  }

}
