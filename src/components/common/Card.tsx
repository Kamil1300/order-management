"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { Btn } from "@/components/common/Button";
import { Item } from "@/types/item.type";

export const Card = ({ items }: { items: Item }) => {
    const [loading, setLoading] = useState(Boolean)

    const handleClick = () => {
        setLoading(true)
        try {
            setTimeout(() => {
                console.log("Yes Working")
                setLoading(false)
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="w-80 h-100 border-2 border-[#FF6A3D] rounded-md">
            <Image className="h-50 w-80" height={1900} width={1267} quality={100} alt="image" src={items.image} loading="eager" />
            <h1 className="py-5 text-center font-bold capitalize">
                {items.name}
            </h1>
            <p className="text-black px-5">{items.description}</p>
            <div className="ml-60">
                <Btn name="Buy" isLoading={loading} onClick={() => handleClick()} />
            </div>
        </div>
    )
}