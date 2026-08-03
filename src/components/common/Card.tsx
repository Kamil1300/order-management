"use client"
import { useState } from "react";
import Image from "next/image";
import { Btn } from "@/components/common/Button";

export const Card = () => {
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
            <Image className="h-50 w-80" height={1900} width={1267} quality={100} alt="burger" src={"https://foodish-api.com/images/burger/burger2.jpg"} loading="eager" />
            <h1 className="py-5 text-center font-bold">
                Special Smash Burger
            </h1>
            <p className="text-black px-5">Thin pressed flat onto a hot griddle to create an extra-crispy, lacy edge and a juicy interior</p>
            <div className="ml-60">
                <Btn name="Buy" isLoading={loading} onClick={() => handleClick()} />
            </div>
        </div>
    )
}