import { Component, OnInit } from '@angular/core';
import { ApiService } from '../config/api.service';
import { HelpersService } from '../config/helpers.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  public invoices: any;
  constructor(
    private api: ApiService,
    private helpers: HelpersService
  ) { }

  ngOnInit(): void {
    this.getInvoices()
  }

  getInvoices() {
    this.api.myOrders().subscribe(
      data => { this.invoices = data },
      err => console.error(err)
    )
  }

  formatDate(date) {
    return this.helpers.setInvoiceDate(date);
  }

}
