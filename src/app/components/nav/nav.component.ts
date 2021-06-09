import { Component, OnInit, ViewChild, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HelpersService } from '../../config/helpers.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnChanges {
  public user: any;
  public path: any;
  public showNav = true;
  @Input('route') route: any;
  constructor(
    private helpers: HelpersService
  ) { }

  ngOnInit(): void {
    if (this.helpers.isBrowser()) {
      this.user = this.helpers.currentUser()
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.path = changes.route.currentValue;
    this.showNav = ['/login', '/signup'].includes(this.path) ? false : true;
    if (this.helpers.isBrowser()) {
      this.user = this.helpers.currentUser()
    }
   }

  logout() {
    this.helpers.logout();
  }
}
