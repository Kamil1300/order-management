"use client"
import { useState } from "react";
import Image from "next/image";
import { Btn } from "@/components/common/Button";
import { Item } from "@/types/item.type";
import { useRouter } from "next/navigation";

export const Card = ({ items }: { items: Item }) => {
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()
    return (
        <div className="w-80 h-100 rounded-md border-4 border-black">
            <Image className="h-50 w-80" height={1900} width={1267} quality={100} alt="image" src={items?.image} loading="lazy" />
            <h1 className="py-5 text-center font-bold capitalize">
                {items?.name} {items?.is_veg ? "🟢" : "🔴"}
            </h1>
            <p className="text-black px-5 text-ellipsis h-20">{items?.description} <span className="font-bold">in just {items?.price} rupees</span></p>
            <div className="sm:ml-60 ml-55">
                <Btn name="Buy" isLoading={loading} onClick={() => router.push(`cart/${items?._id}`)} />
            </div>
        </div>
    )
}