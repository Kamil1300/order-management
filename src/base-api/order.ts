import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
import { Order } from "@/types/order.type";

export const createOrder = async (orderData: Order) => {
    try {
        const order = await axios.post(`${baseUrl}/order`, orderData)
        return order.data.data
    } catch (error) {
        console.error(error)
    }
} 