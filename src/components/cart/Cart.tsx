"use client"
import { getItemById } from "@/base-api/items"
import { useEffect, useState } from "react"
import { Item } from "@/types/item.type"
import Image from "next/image"
import { Btn } from "@/components/common/Button"
import OrderModal from "@/components/cart/OrderModal"

export const Cart = ({ id }: { id: string }) => {
    const [item, setItem] = useState<Item>()
    const [loading, setLoading] = useState<boolean>(false)
    const [count, setCount] = useState<number>(1)
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            const item = await getItemById(id)
            setItem(item)
        }
        if (id) {
            fetchItem()
        }
    }, [id])

    const handleIncrement = () => {
        const num = count
        if (count < 10) {
            setCount(num + 1)
        }
    }
    const handleDecrement = () => {
        const num = count
        if (count > 1) {
            setCount(num - 1)
        }
    }

    return (
        <>
        { item ?
            <div className="w-80 h-100 rounded-md border-4 border-black">
                <Image className="h-50 w-80" height={1900} width={1267} quality={100} alt="image" src={item?.image} loading="lazy"/>
                <h1 className="py-5 text-center font-bold capitalize">
                    {item?.name} {item?.is_veg ? "🟢" : "🔴"}
                </h1>
                <p className="text-black px-5 text-ellipsis h-20">{item?.description} <span className="font-bold">in just {item?.price} rupees</span></p>
                <div className="sm:ml-45 ml-35 flex gap-3">
                    <div>
                        <Btn name="+" onClick={() => handleIncrement()} />
                    </div>
                    <div>
                        <div className="mt-4 h-6 w-6 bg-[#FF6A3D] text-center rounded text-white">{count}</div>
                    </div>
                    <div>
                        <Btn name="-" onClick={() => handleDecrement()} />
                    </div>
                </div>
                <div>
                    <h3 className="text-center mt-10 text-black font-bold text-2xl">Billing</h3>
                    <p className="mt-3 text-black">Single Item price : {item?.price}</p>
                    <p className="mt-3 text-black">Total Item Price: {item && item?.price * count}</p>
                    <p className="mt-3 text-black">Total Item Quantity: {count}</p>
                    <Btn name="Check Out" isLoading={loading} onClick={() => setOpen(true)} />
                </div>
            </div> : <div className="text-center">Oops! Item not found</div>}
            <OrderModal open={open} setOpen={setOpen} item={item as Item} count={count}/>
            </>
    )
}