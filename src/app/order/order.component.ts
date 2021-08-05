import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';

export class Order {
  constructor(
    public id: number,
    public orderName: string,
    public price: number,
    public is_Discounted: boolean,
  ){

  }
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Output() alert = new EventEmitter<string>();
  @ViewChild('orderName', { static: false })orderName!: ElementRef;
  @ViewChild('price', { static: false }) price!: ElementRef;
  @ViewChild('discounted', { static: false }) discounted!: ElementRef;
  public orderForm!: FormGroup;

  order: any = [];
  orders: Order[] = [];
  deleteMessage!: string;
  addMessage!: string;
  edit!: Order
  editMode!: true;
  editmode!: false;
  id!: number;
  clerk!: string;
  totalRegularBill!: any;
  totalDiscountBill!: any

  constructor(private orderService: OrderService,
              private router : Router) { }

  ngOnInit(): void {

    this.refreshOrder();

    this.orderService.getClerkName().subscribe(name => {
      console.log(name);
      let clerkName = JSON.parse(JSON.stringify(name));
      this.clerk = clerkName.name;
    })

    this.orderService.getTotalRegularBill().subscribe(data => {
      this.totalRegularBill = data;

      this.refreshOrder();
    })

    this.orderService.getTotalDiscountedBill().subscribe(data => {
      this.totalDiscountBill = data;

      this.refreshOrder();
    })
  }

refreshOrder(){
  this.orderService.getOrders().subscribe(data => {
    this.orders = data;
  })
}

addOrder(order: {orderName: string, price: number, is_Discounted: boolean}){
  this.orderService.addOrder(
    order.orderName,
    order.price,
    order.is_Discounted).subscribe(data => {
      console.log(data);
      this.order = data;
      this.addMessage = `Order added successfully`

    this.refreshOrder();
  },
  (error) => {
    console.log(error);
    this.alert.emit('add');
  });
}

editOrder(order: Order) {
  this.edit = order;
  this.editMode = true;
}

deleteOrder(id:number) {
  console.log(`delete order ${id}`);
  this.orderService.deleteOrder(id).subscribe (data => {
    console.log(data);
    this.deleteMessage = `Deleted Successfully`

    this.refreshOrder();
  },
  (error) => {
    console.log(error);
    this.alert.emit('deleteError');
  });
}

updateOrder(id: number) {
  // if(this.id) {
    this.orderService.updateOrder(id, this.order).subscribe(data => {
      console.log(data);
      this.order = data;
      this.alert.emit('update');

      this.refreshOrder();
    },
    (error) => {
      console.log(error);
      this.alert.emit('updateError');
    });
  // }

}

cancelOrder() {
  this.editMode = true;
}

clearForm() {
  this.orderForm.reset();
}

}

