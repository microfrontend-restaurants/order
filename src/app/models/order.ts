import { OrderItem } from "./order-item";

export interface Order {
    createdDate?: Date,
    id: number,
    items: OrderItem[]
}