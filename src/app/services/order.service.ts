import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';
import { map } from 'rxjs/operators';
import { Restaurant } from '../models/restaurant';
import { RestaurantItem } from '../models/restaurant-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrderItems(ids: number[]) {

    let params = new HttpParams();

    ids.forEach(id => params = params.append("ids", id));

    return this.httpClient.get<RestaurantItem[]>(`${environment.api}/restaurant/Items`, {
      params: params
    });
  }

  getRestaurantName(id: number, withItems: boolean = false) {
    return this.httpClient.get<Restaurant>(`${environment.api}/restaurant/${id}`, {
      params: new HttpParams().append("withItems", withItems)
    }).pipe(map(result => result?.name));
  }

  saveOrder(order: Order) {
    return this.httpClient.post<number>(`${environment.api}/order`, order);
  }

  getOrders() {
    return this.httpClient.get<Order[]>(`${environment.api}/order`);
  }
}
