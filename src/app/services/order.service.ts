import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestaurantItem } from '../../../../shared/models/restaurant-item';
import { Restaurant } from '../../../../shared/models/restaurant';
import { Order } from '../models/order';

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

  getRestaurantById(id: number, withItems: boolean = false) {
    return this.httpClient.get<Restaurant>(`${environment.api}/restaurant/${id}`, {
      params: new HttpParams().append("withItems", withItems)
    });
  }

  saveOrder(order: Order) {
    return this.httpClient.post<number>(`${environment.api}/order`, order);
  }
}
