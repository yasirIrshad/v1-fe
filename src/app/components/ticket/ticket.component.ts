import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HelpersService } from '../../config/helpers.service';
import { CartService } from '../../config/cart.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit, OnChanges {
  @Input() tickets: any;
  @Input() event: any;
  public ticketOptions: any;
  public vipItems: any;
  public price: any;
  public merchItems: any;
  ticketSelected: any;
  constructor(
    private helpers: HelpersService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.ticketOptions = changes.tickets.currentValue;
    this.vipItems = changes.event.currentValue.products.filter(product => product.free_with_vip === true);
    this.event = changes.event.currentValue;
    this.merchItems = this.event.products;
  }

  ticketName(type) {
    return this.helpers.maskTicketName(type)
  }

  setTicket(event) {
    const value = event.target.value;
    this.ticketSelected = this.ticketOptions.find(ticket => ticket.id === value);
    this.price = this.ticketSelected ? this.ticketSelected.price : 0;
    this.cartService.setTicket(this.ticketSelected);
  }

}
