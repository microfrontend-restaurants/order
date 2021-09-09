import { OrderItem } from "./order-item";

export interface Order {
    id: number,
    items: OrderItem[]
}