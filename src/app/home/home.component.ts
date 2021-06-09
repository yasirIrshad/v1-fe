import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { ApiService } from '../config/api.service';
import { HelpersService } from '../config/helpers.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public events: any;
  public event: any;
  public premieres: any;
  public mostPopular: any;
  public main: any;
  public backgroundImage: any;
  public featuredEvent: any;
  public featuredImage: any;
  public performers: any;
  public genres: any;
  public charting: any;
  public eventTruncate: number;
  public nameTruncate: number;
  public isBrowser: boolean;
  public loading = true;
  public contentLoaded = false;

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    simulateTouch: true,
    navigation: {
      nextEl: '.next1',
      prevEl: '.prev1'
    },
    spaceBetween: 20,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 4
      }
    }
  };

  configAlt: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    simulateTouch: true,
    navigation: {
      nextEl: '.next2',
      prevEl: '.prev2'
    },
    spaceBetween: 20,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 4
      }
    }
  };

  constructor(
    private api: ApiService,
    private helpers: HelpersService,
    private renderer2: Renderer2,
  ) { }

  @HostListener('window:scroll') onScroll(e: Event): void {
    const nav = document.querySelector('nav');
    if (window.pageYOffset > 0) {
      // nav.style.filter = "blur(30px)"
      // nav.style.background = '#1a2030cf';
      // nav.classList.add('nav-blur');
    } else {
      // nav.classList.remove('scrolled');
      // nav.classList.remove('nav-blur');
      // nav.style.background =
        // 'linear-gradient(180deg, #000000 -20%, #00000010 72%, #00000000 101%)';
    }
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    const windowSize = event.target.innerWidth;
    if (windowSize < 1185) {
      this.setMobileView();
    } else {
      this.unSetMobileView()
    }
  }

  

  ngOnInit(): void {
    if (this.helpers.isBrowser() && !this.loading) {
      this.getViewSize();
    }
    this.getEvents();
    this.getPerformers();
    this.getGenres();
    this.getCharting();
    this.isBrowser = this.helpers.isBrowser();
    if (this.isBrowser) {
      this.helpers.setBG()
    }
  }

  getViewSize() {
    const windowSize = window.innerWidth;
    if (windowSize < 1185) {
      this.setMobileView()
    } else {
      this.unSetMobileView()
    }
  }

  setMobileView() {
    const chartsList = document.getElementById('charts-list');
    chartsList.classList.add('list-group-horizontal');
    this.eventTruncate = 14;
    this.nameTruncate = 10;
  }

  unSetMobileView() {
    const chartsList = document.getElementById('charts-list');
    if (chartsList) chartsList.classList.remove('list-group-horizontal');
    this.eventTruncate = 30;
    this.nameTruncate = 20;
  }

  getEvents() {
    this.api.getEvents().subscribe((data: Array<any>) => {
      this.events = data,
      this.premieres = data.filter(event => (event.status !== 'completed')).sort((a, b) => new Date(b.start).getTime() + new Date(a.start).getTime());
      this.mostPopular = data.filter(event => event.status === 'completed' || event.status === 'live').sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());
      this.event = this.events[0];
      // this.assetService.setAsset(this.main);
      this.getFeatured(data);
    });
  }

  getFeatured(data) {
    this.featuredEvent = data.find(event => event.is_featured);
    if (!this.featuredEvent) {
      return this.loading = false;
    }
    this.backgroundImage = this.helpers.getImageCDNPath(this.featuredEvent.performers[0].flyer.formats.small.url);
    this.featuredImage = this.backgroundImage;
    this.loading = false;
    this.contentLoaded = true;
  }

  getPerformers() {
    this.api.getArtists().subscribe(data => (this.performers = data));
  }

  getGenres() {
    this.api.getGenres().subscribe(data => (this.genres = data));
  }

  getCharting() {
    this.api.getCharting().subscribe(data => (this.charting = data));
  }

  setEventStartDate(date) {
    if (date) {
      return this.helpers.setEventStartDate(date);
    }
  }

  setEventDuration(start, end) {
    return this.helpers.setEventDuration(start, end);
  }

  truncateText(str, length, ending) {
    return this.helpers.textTruncate(str, length, ending);
  }

}
