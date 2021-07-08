import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @HostListener('window:resize', ['$event']) onResize(event) {
    const windowSize = event.target.innerWidth;
    const heading = document.getElementById('my-profile-heading');
    if (windowSize < 824) {
      heading.style.display = "none";
    } else {
      heading.style.display = "block";
    }
 }

  constructor() { }

  ngOnInit(): void {
  }

}
