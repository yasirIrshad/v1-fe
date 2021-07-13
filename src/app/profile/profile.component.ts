import { Component, OnInit, HostListener } from '@angular/core';
import { isPlatformBrowser, isPlatformServer, DOCUMENT } from '@angular/common';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @HostListener('window:resize', ['$event']) onResize(event) {
    const windowSize = event.target.innerWidth;
    const heading = document.getElementById('my-profile-heading');
    const path = location.pathname.split('/')[3];
    if (windowSize < 824) {
      if (path === 'personal-details' || path === 'login-security' || path === 'invoices' || path === 'address' || path === 'newsletter') {
        heading.style.display = "none";
      }
    } else if (windowSize > 824) {
        heading.style.display = "block";
    }
    else if (path === 'my-profile') {
      heading.style.display = "block";
    }
  }
  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit(): void {
  }

}
