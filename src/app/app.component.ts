import { Component, OnInit } from '@angular/core';
import { SeoService } from './config/seo.service';
import { HelpersService } from './config/helpers.service';
import { Router, NavigationEnd  } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  path: any;
  constructor(
    private helpers: HelpersService,
    private seoService: SeoService,
    private router: Router,
    private location: Location
  ) {
    location.onUrlChange(url => this.path = url);
  }

  ngOnInit() {}
}
