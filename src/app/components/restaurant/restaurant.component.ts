import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Restaurant } from '../../../../../shared/models/restaurant';

@Component({
  selector: 'order-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  @Input() id: number = 0;

  restaurant: Restaurant | null = null;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getRestaurantById(this.id).subscribe(r => this.restaurant = r);
  }
}
