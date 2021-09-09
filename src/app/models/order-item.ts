import { RestaurantItem } from "./restaurant-item";

export interface OrderItem {
    amount: number,
    item: RestaurantItem
}