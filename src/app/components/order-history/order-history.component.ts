import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { CommonUtils } from 'src/app/utils/common-utils';

@Component({
  selector: 'order-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(o => this.orders = o);
  }

  getPrice(order: Order) {
    return order.items
    .map(o => CommonUtils.round(o.amount * o.item.price))
    .reduce((a, b) => a + b, 0);
  }

}
