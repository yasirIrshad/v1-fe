import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HelpersService } from '../config/helpers.service';
import { ApiService } from '../config/api.service';
import { TokenService } from '../config/token.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  public countries: any;
  user: any;
  shippingAddress: any;

  addressForm= this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    address_1: ['', [Validators.required, Validators.minLength(4)]],
    address_2: [''],
    city: ['', [Validators.required, Validators.minLength(4)]],
    state: ['', [Validators.required, Validators.minLength(4)]],
    postalCode: ['', [Validators.required, Validators.minLength(4)]],
    country: ['', [Validators.required, Validators.minLength(4)]]
  })

  constructor(
    private fb: FormBuilder,
    private helpers: HelpersService,
    private api: ApiService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.getCountries()
    if (this.helpers.isBrowser()) {
      this.user = this.tokenService.getUser();
      this.shippingAddress = this.user.shipping_address;
      if (this.shippingAddress) {
        this.setFormAttributes();
      }
    }
  }

  getCountries() {
    this.countries = this.helpers.getCountries();
  }

  setFormAttributes() {
    this.addressForm.setValue({firstName: this.shippingAddress.firstName, lastName: this.shippingAddress.lastName, address_1: this.shippingAddress.address_1, address_2: this.shippingAddress.address_2, country: this.shippingAddress.country, city: this.shippingAddress.city, state: this.shippingAddress.state, postalCode: this.shippingAddress.postalCode });
  }

  onSubmit() {
    this.api.createOrUpdateShippingAddress(this.addressForm.value).subscribe(
      data => this.tokenService.saveUser(data),
      err => console.error(err)
    )
  }

}
