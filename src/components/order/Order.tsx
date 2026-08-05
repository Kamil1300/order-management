"use client"
import { useEffect, useState } from "react";
import { Btn } from "@/components/common/Button";
import { Item } from "@/types/item.type";
import { getItemById } from "@/base-api/items";
import ItemModel from "@/components/order/ItemModal";
import { Order as OrderType } from "@/types/order.type";
import { cancelOrder, updateOrderStatus } from "@/base-api/order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export const Order = ({ orders, enabled }: { orders: OrderType, enabled: boolean }) => {
    const [item, setItem] = useState<Item>()
    const [open, setOpen] = useState(false)
    const router = useRouter()
    console.log(orders, "Here")
    const statusColor: Record<string, string> = {
        "Order Received": "text-blue-600",
        "Preparing": "text-yellow-600",
        "Out for Delivery": "text-purple-600",
        "Delivered": "text-green-600",
        "Cancelled": "text-red-600",
    };
    useEffect(() => {
        const item = async () => {
            const response = await getItemById(orders?.item_id)
            setItem(response)
        }

        if (orders && orders?.item_id) {
            item()
        }
    }, [orders?.item_id])

    const handleCancelOrder = async (id: string) => {
        const response = await cancelOrder(id)
        if (response.status = 200) {
            toast(response.message)
            router.refresh()
        } else {
            toast("Oops! Something went wrong")
        }
    }

    useEffect(() => {
        if (!enabled) return;

        const updateStatus = async () => {
            const response = await updateOrderStatus()
            return response
        }

        const interval = setInterval(() => {
            updateStatus()
            router.refresh();
        }, 5000);
        router.refresh()
        return () => clearInterval(interval);
    }, [enabled]);

    return (
        <>
            <div className="w-90 h-60 rounded-md border-4 border-black">
                <h2 className="text-black text-center pt-2 font-bold text-md">{orders.user_name}</h2>
                <div className="flex items-center justify-evenly">
                    <div className="text-center pt-2 text-black">Status: <span className={`${statusColor[orders?.status ?? ""]}`}>{orders.status}</span></div>
                    {orders?.status == "Cancelled" ? "" : <Btn name="Cancel" onClick={() => handleCancelOrder(orders._id as string)} bgColor="bg-red-600" hover="hover:bg-red-500" />}
                </div>
                <div className="flex items-center justify-evenly">
                    <h3 className="text-black text-center pt-2">Item: {item?.name}</h3>
                    <Btn name="View Item" onClick={() => setOpen(true)} />
                </div>
                <h3 className="text-black text-center pt-2">Total : <span className="font-bold">{orders.cost} Rupees</span> for <span className="font-bold">{orders.total_item}</span> items</h3>
                <h3 className="text-black text-center pt-2 px-1 truncate">Address: {orders.address}</h3>
                <h3 className="text-black text-center pt-1">Phone: {orders.phone}</h3>
            </div>
            <ItemModel setOpen={setOpen} open={open} item={item as Item} count={orders.total_item} />
        </>
    )
}