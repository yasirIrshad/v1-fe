import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-merch',
  templateUrl: './merch.component.html',
  styleUrls: ['./merch.component.scss']
})
export class MerchComponent implements OnInit, OnChanges {
  @Input() freeItems: any;
  @Input() items: any;
  @Input() event: any;
  @Input() products: any;
  public vipItems: any;
  public eventInfo: any;
  public productInfo: any;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.vipItems = changes.freeItems ? changes.freeItems.currentValue : '';
    this.eventInfo = changes.event ? changes.event.currentValue : '';
    this.productInfo = changes.products ? changes.products.currentValue : '';
  }

  setVipMerch(item) {
    console.log(item.target.value)
  }

}
