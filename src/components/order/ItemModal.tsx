"use client";

import { Item } from "@/types/item.type";
import Image from "next/image";

export default function ItemModel({ open, setOpen, item, count }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, item: Item, count: number }) {
    if (!open || !item) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center">
            <div className="bg-[#F9F6F2] rounded-lg p-6 w-[400px] rounded-md border-4 border-black">
                <div className="text-black font-bold text-right cursor-pointer text-xl" onClick={() => setOpen(false)}>X</div>
                <Image className="h-50 w-80" height={1900} width={1267} quality={100} alt="image" src={item?.image} loading="lazy" unoptimized/>
                <h1 className="py-5 text-center font-bold capitalize">
                    {item?.name} {item?.is_veg ? "🟢" : "🔴"}
                </h1>
                <p className="text-black px-5 text-ellipsis h-20 text-center">{item?.description} <span className="font-bold">in just {item?.price} rupees</span></p>


                <h3 className="text-black text-center">Your Order : <span className="font-bold">{item.price * count} Rupees</span> for <span className="font-bold">{count}</span> items</h3>
                <div className="flex justify-end gap-2">
                </div>
            </div>
        </div>
    );
}