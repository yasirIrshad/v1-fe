import { Component, OnInit } from '@angular/core';
import { TokenService } from '../config/token.service';

@Component({
  selector: 'app-login-security',
  templateUrl: './login-security.component.html',
  styleUrls: ['./login-security.component.scss']
})
export class LoginSecurityComponent implements OnInit {
  public user: any;
  constructor(
    private tokenService: TokenService
    ) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
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

