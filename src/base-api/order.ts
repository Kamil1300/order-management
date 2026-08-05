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

export const getOrders = async () => {
    try {
        const response = await axios.get(`${baseUrl}/order`, {
            headers: {
                "Cache-Control": "no-cache",
            },
            params: {
                t: Date.now()
            })
        return response.data.data
    } catch (error) {
        console.error(error)
    }
}

export const cancelOrder = async (id:string) => {
    try {
        const response = await axios.patch(`${baseUrl}/order`,{id})
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const updateOrderStatus = async() => {
    try {
        const response = await axios.put(`${baseUrl}/order`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}