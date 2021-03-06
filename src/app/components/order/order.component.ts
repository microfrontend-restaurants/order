import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { CommonUtils } from 'src/app/utils/common-utils';
import { OrderItem } from '../../models/order-item';

@Component({
  selector: 'order-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})


export class OrderComponent implements OnInit {

  private readonly KEY_CHECKOUT = "checkout";

  groupedResult: { [key: number]: OrderItem[] } = [];
  loading: boolean = true;
  orderCompleted: boolean = false;

  constructor(
    private orderService: OrderService
  ) { }

  // https://stackoverflow.com/questions/42136098/array-groupby-in-typescript
  groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
    list.reduce((previous, currentItem) => {
      const group = getKey(currentItem);
      if (!previous[group]) previous[group] = [];
      previous[group].push(currentItem);
      return previous;
    }, {} as Record<K, T[]>);

  ngOnInit(): void {
    let ids = localStorage.getItem(this.KEY_CHECKOUT);
    let parsedIds: number[] = ids == null ? [] : JSON.parse(ids);
    const distinctIds = parsedIds.filter((n, i) => parsedIds.indexOf(n) === i);

    this.orderService.getOrderItems(distinctIds).subscribe(items => {
      var orderItems = items.map(item => <OrderItem>{
        item: item,
        amount: parsedIds.filter(id => item.id === id).length
      })
      this.groupedResult = this.groupBy(orderItems, i => i.item.parentId);
      this.loading = false;
    });
  }

  toNumber(value: string) {
    return Number(value);
  }

  // Update item amount or remove item completely 
  onAmountChanged(result: any, orderItem: OrderItem) {
    orderItem.amount = result.target.value;

    if (orderItem.amount == 0) {
      let result = this.groupedResult[orderItem.item.parentId].filter(oi => oi.item.id !== orderItem.item.id);

      if (result.length == 0) {
        delete this.groupedResult[orderItem.item.parentId]; // remove restaurant
      } else {
        this.groupedResult[orderItem.item.parentId] = result; // remove items
      }
    }

    this.updateItemIds();
  }

  get keys() {
    return Object.keys(this.groupedResult).map(key => this.toNumber(key));
  }

  get hasItems() {
    return this.keys.length > 0;
  }

  get totalSum() {
    let sum = 0;
    this.keys.forEach(key =>
      sum += this.groupedResult[key].map(i => CommonUtils.round(i.amount * i.item.price))
        .reduce((sum, current) => sum + current, 0)
    );

    return sum;
  }

  private updateItemIds() {
    let itemIds: number[] = [];

    this.keys.forEach(key =>
      this.groupedResult[key].forEach(result => {
        for (let i = 0; i < result.amount; i++) {
          itemIds.push(result.item.id);
        }
      })
    );

    localStorage.setItem(this.KEY_CHECKOUT, JSON.stringify(itemIds));

    this.notifyOrderChange(itemIds.length)
  }

  clearCart() {
    this.groupedResult = [];
    localStorage.removeItem(this.KEY_CHECKOUT);
    this.notifyOrderChange(0);
  }

  completeOrder() {

    let items: OrderItem[] = [];

    this.keys.forEach(key =>  items.push(...this.groupedResult[key]));

    this.orderService.saveOrder({
      items: items,
      id: -1
    }).subscribe(() => {
        this.clearCart();
        this.orderCompleted = true;
        // TODO show order successful message
    }, error => alert(error.message));
  }

  private notifyOrderChange(count: number) {
    const itemUpdatedEvent = new CustomEvent("order:orderCount_updated", {
      bubbles: true,
      detail: { count: count }
    });
    window.dispatchEvent(itemUpdatedEvent);
  }
}
