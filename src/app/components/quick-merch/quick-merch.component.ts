import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-quick-merch',
  templateUrl: './quick-merch.component.html',
  styleUrls: ['./quick-merch.component.scss']
})
export class QuickMerchComponent implements OnInit, OnChanges {
  @Input('item') item: any;
  merchItem: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
   this.merchItem = changes.item ? changes.item.currentValue : '';
  }

}
