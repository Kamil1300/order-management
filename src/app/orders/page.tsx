import { getOrders } from "@/base-api/order"
import { Order } from "@/components/order/Order"
import { Order as OrderType } from "@/types/order.type"
const Orders = async () => {
    const orders:OrderType[] = await getOrders()
    const activeStatuses: OrderType["status"][] = [
        "Order Received",
        "Preparing",
        "Out for Delivery",
    ];
    const hasActiveOrders:boolean = orders?.some(order =>
        activeStatuses.includes(order?.status)
    );
    console.log(hasActiveOrders)
    return (
        <div className="flex mx-30 mb-20 mt-10 font-sans flex-wrap gap-10 justify-center items-center">
            {orders ? orders?.map((o: OrderType) => (
                <Order orders={o as OrderType} enabled={hasActiveOrders}/>
            )) : <h2>Currently there are no active orders</h2>} 
        </div>
    )
}

export default Orders