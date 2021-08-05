import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Order } from './order/order.component';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnInit{

  orders: Order[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getOrders().subscribe(Response => {
      console.log(Response);
    })
  }

  getOrders() {
    return this.http.get<Order[]>('http://localhost:8090/orders');
  }

  addOrder(orderName: string, price: number, is_Discounted: boolean) {
    const order = {orderName: orderName, price: price, is_Discounted: is_Discounted }
    return this.http.post('http://localhost:8090/add', order);
  }

  deleteOrder(id: number) {
    return this.http.delete(`http://localhost:8090/orders/${id}`)
  }

  updateOrder(order: any, id: number) {
    return this.http.put(`http://localhost:8090/update/${id}`, order)
  }

  getClerkName() {
    return this.http.get('http://localhost:8090/clerk')
  }

  getTotalRegularBill(){
    return this.http.get('http://localhost:8090/regularBill');
  }

  getTotalDiscountedBill() {
    return this.http.get('http://localhost:8090/discountBill');
  }
}
