import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {

  message!: string;
  refreshOrders!: string;

  constructor() { }

  ngOnInit(): void {
  }

  refreshOrdersList(load: string) {
    this.refreshOrders = load;
  }

  getMessage(message: string) {
    this.message = message;
  }

  removeAlert() {
    this.message = '';
  }

}
