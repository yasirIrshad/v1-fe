import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../config/api.service';
import { HelpersService } from '../config/helpers.service';


@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  genre: string;
  performers: any;
  genreArtist: any;
  @ViewChild('nav') nav: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private helpers: HelpersService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => (this.genre = data.type));
    this.getPerformers();
    if (this.helpers.isBrowser()) {
      window.scrollTo(0, 0)
    }
  }

  getPerformers() {
    this.api.getArtists().subscribe(data => {
      this.performers = data;
      this.genreArtist = this.performers.filter(artist =>
        artist.genres.find(genre => genre.name === this.genre)
      );
    });
  }

  @HostListener('window:scroll') onScroll(e: Event): void {
    const nav = document.querySelector('nav');
    if (window.pageYOffset > 0) {
      // nav.style.filter = "blur(30px)"
      nav.style.background = '#1a2030cf';
      nav.classList.add('nav-blur');
    } else {
      nav.classList.remove('scrolled');
      nav.classList.remove('nav-blur');
      nav.style.background =
        'linear-gradient(180deg, #000000 -20%, #00000010 72%, #00000000 101%)';
    }
  }

  goBack() {
    this.helpers.goBack()
  }

}
