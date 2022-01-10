import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';
import { RestaurantItem } from '../models/restaurant-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrderItems(ids: number[]) {

    let params = new HttpParams();

    ids.forEach(id => params = params.append("ids", id));

    return this.httpClient.get<RestaurantItem[]>(`${environment.api}/orders/Items`, {
      params: params
    });
  }

  saveOrder(order: Order) {
    return this.httpClient.post<number>(`${environment.api}/orders`, order);
  }

  getOrders() {
    return this.httpClient.get<Order[]>(`${environment.api}/orders`);
  }
}
