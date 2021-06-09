import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '../config/api.service';
import { environment } from '../../environments/environment';
import { HelpersService } from '../config/helpers.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  genres: any;
  constructor(
    private api: ApiService,
    private helpers: HelpersService
  ) { }

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

  ngOnInit(): void {
    this.api.getGenres().subscribe(
      data => this.genres = data
    )
  }

  goBack() {
    this.helpers.goBack();
  }

}
