"use client"

import { Card } from "@/components/item/Card"
import { Item as ItemType } from "@/types/item.type";
import { useRouter } from "next/navigation";
import { Btn } from "@/components/common/Button";
export default function Item({items} : {items:ItemType[]}) {
    const router = useRouter()
    
    return (
        <div>
            <div className="text-center pt-8 font-extrabold text-2xl text-black">
                <h1>RaftLab's Special Canteen</h1>
                <Btn name="My Orders" onClick={() => router.push("/orders")} />
            </div>
            {/* Burgers  */}
            <h3 className="text-center mt-15 font-extrabold text-xl text-black">Burgers🍔</h3>
            <p className="text-center text-black">🟢 veg 🔴 non-veg</p>
            <div className="flex sm:mx-30 mb-20 mt-10 font-sans flex-wrap gap-10 justify-center items-center">
                {items ? items?.map((item: ItemType) => (
                    item.type == "burger" &&
                    <Card items={item} key={item._id} />
                )) : <h3>Sorry Currently there are no items</h3>}
            </div>
            {/* Pizzas  */}
            <h3 className="text-center mt-15 font-extrabold text-xl text-black">Pizza🍕</h3>
            <p className="text-center text-black">🟢 veg 🔴 non-veg</p>
            <div className="flex sm:mx-30 mb-20 mt-10 font-sans flex-wrap gap-10 justify-center items-center">
                {items ? items?.map((item: ItemType) => (
                    item.type == "pizza" &&
                    <Card items={item} key={item._id} />
                )) : <h3>Sorry Currently there are no items</h3>}
            </div>
        </div>
    );
}
