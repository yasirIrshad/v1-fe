import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HelpersService } from '../../config/helpers.service';

@Component({
  selector: 'app-profile-sub-header',
  templateUrl: './profile-sub-header.component.html',
  styleUrls: ['./profile-sub-header.component.scss']
})
export class ProfileSubHeaderComponent implements OnInit, OnChanges {
  @Input('path') path: any;
  @Input('text') text: any;
  currentRoute: any;
  subText: any;
  constructor(private helpers: HelpersService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentRoute = changes.path ? changes.path.currentValue : '';
    this.subText = changes.text ? changes.text.currentValue : '';
  }

  goBack() {
    this.helpers.goBack()
  }

}
