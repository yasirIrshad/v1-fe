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

}

