import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HelpersService } from '../config/helpers.service';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {
  public type: string;
  constructor(
    private route: ActivatedRoute,
    private helpers: HelpersService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      data => this.getType(data)
    );    
  }

  getType(data) {
    this.type = data.type;

    if (this.helpers.isBrowser()) {
      window.scrollTo(0, 0)
    }
  }

}
