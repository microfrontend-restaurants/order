import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'order-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  @Input() id: number = 0;

  name: string | null = null;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getRestaurantName(this.id).subscribe(r => this.name = r);
  }
}
