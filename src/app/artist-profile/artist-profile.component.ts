import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../config/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HelpersService } from '../config/helpers.service';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.scss']
})
export class ArtistProfileComponent implements OnInit {
  performer: any;
  premierers: any;
  library: any;
  events: any;
  purchasedShows: any;
  tabSelected: any;
  merchItems = [
    { name: 'Grey Crewneck', price: 30.00, img: '../assets/sweatshirt.png' },
    { name: 'Grey Crewneck', price: 30.00, img: '../assets/sweatshirt.png' },
    { name: 'Grey Crewneck', price: 30.00, img: '../assets/sweatshirt.png' },
    { name: 'Grey Crewneck', price: 30.00, img: '../assets/sweatshirt.png' },
    { name: 'Grey Crewneck', price: 30.00, img: '../assets/sweatshirt.png' },
    { name: 'Grey Crewneck', price: 30.00, img: '../assets/sweatshirt.png' },
  ];
  @ViewChild('shows') shows: ElementRef;
  @ViewChild('merch') merch: ElementRef;
  @ViewChild('bio') bio: ElementRef;

  @HostListener('window:scroll') onScroll(e: Event): void {
    const nav = this.helpers.doc().querySelector('nav');
    if (this.helpers.isBrowser()) {
      if (window.pageYOffset > 0) {
      nav.style.background = '#1a2030cf';
      nav.classList.add('nav-blur');
      } else {
        nav.classList.remove('scrolled');
        nav.classList.remove('nav-blur');
        nav.style.background =
          'linear-gradient(180deg, #000000 -20%, #00000010 72%, #00000000 101%)';
      }
    }
  }

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private helpers: HelpersService
  ) { }

  ngOnInit(): void {
    // this.myEvents();
    this.route.params.subscribe(data => this.getPerformer(data.id));
    // Sets active tab
    if (this.helpers.isBrowser()) {
      const tabs = document.querySelectorAll('.tab-item');
      tabs[0].classList.add('active')
      this.tabSelected = 'shows';
    }
  }

  getDay(date) {
    if (date) {
      return this.helpers.getEventDay(date);
    }
  }

  getMonth(date) {
    if (date) {
      return this.helpers.getEventMonth(date);
    }
  }

  getPerformer(id) {
    this.api.getPerformer(id).subscribe(data => {
      this.performer = data;
      const events = data['events'];
      this.events = data['events'];
      this.library = events.filter(event => event.status === 'completed');
      this.premierers = events.find(event => event.status !== 'completed');
      const ids = events.map( event => event.id);
      if (this.helpers.isBrowser()) {
        this.helpers.setBG(this.events[0].background_image.formats.large.url, 'artist-profile')
      }
    });
  }

  myEvents() {
    this.api.getMyShows().subscribe(
      data => this.purchasedShows = data,
      err => console.error(err)
      );
  }

  getPerformerPic(pic) {
    if (pic) {
      return `${pic.url}`;
    }
  }

  truncateText(str, length, ending) {
    return this.helpers.textTruncate(str, length, ending);
  }

  setTab(type, index) {
    this.tabSelected = type;
    const tabs = document.querySelectorAll('.tab-item');
    const items = document.querySelectorAll('.tab-view-items');
    if (type === 'shows') {
      tabs[0].classList.add('active')
      tabs[1].classList.remove('active')
      tabs[2].classList.remove('active')
    }
    if (type === 'merch') {
      tabs[0].classList.remove('active')
      tabs[1].classList.add('active')
      tabs[2].classList.remove('active')
    }
    if (type === 'bio') {
      tabs[0].classList.remove('active')
      tabs[1].classList.remove('active')
      tabs[2].classList.add('active')
    }
  }
}
