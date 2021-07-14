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
  @HostListener('window:scroll') onScroll(e: Event): void {
    const nav = this.helpers.doc().querySelector('nav');
    if (this.helpers.isBrowser()) {
      if (window.pageYOffset > 0) {
      nav.style.background = 
      'transparent linear-gradient(180deg, #1a2030 0%, #1a203000 100%) 0% 0% no-repeat';
      nav.classList.add('nav-blur');
      } else {
        nav.classList.remove('scrolled');
        nav.classList.remove('nav-blur');
        nav.style.background =
          'linear-gradient(180deg, #000000 -20%, #00000010 72%, #00000000 101%)';
      }
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
