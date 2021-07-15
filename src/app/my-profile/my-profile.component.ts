import { Component, OnInit } from '@angular/core';
import { TokenService } from '../config/token.service';
import { HelpersService } from '../config/helpers.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  public type: string;
  public user: any;
  constructor(
    private tokenService: TokenService,
    private helpers: HelpersService,
  ) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    if (this.helpers.isBrowser()) {
      // this.helpers.setHeader();
    }
  }
  getType(data) {
    this.type = data.type;
    if (this.helpers.isBrowser()) {
      window.scrollTo(0, 0)
    }
  }

}
