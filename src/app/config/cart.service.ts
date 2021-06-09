import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart: any;
  private cartTotals: number;
  private ticket: any;
  public totalDue: number;
  public serviceFee: number;
  public subTotal: number;
  public details: any;
  public shippingFee: number;
  public totalItems: number;
  public hasVip: boolean;

  constructor() { }

  setTicket(ticket) {
    console.log(ticket)
  }
}
