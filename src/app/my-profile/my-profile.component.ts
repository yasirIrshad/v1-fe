import { Component, OnInit } from '@angular/core';
import { TokenService } from '../config/token.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public user: any;
  constructor(
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
  }

}
