import { RestaurantItem } from "../../../../shared/models/restaurant-item";

export interface OrderItem {
    amount: number,
    item: RestaurantItem
}