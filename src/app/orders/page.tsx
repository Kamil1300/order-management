import { getOrders } from "@/base-api/order"
import { Order } from "@/components/order/Order"
import { Order as OrderType } from "@/types/order.type"
const Orders = async () => {
    const orders = await getOrders()
    return (
        <div className="flex mx-30 mb-20 mt-10 font-sans flex-wrap gap-10 justify-center items-center">
            {orders.map((o : OrderType) => (
                <Order orders={o as OrderType}/>
            ))}
        </div>
    )
}

export default Orders