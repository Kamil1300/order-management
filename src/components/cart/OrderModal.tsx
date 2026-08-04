"use client";

import { Item } from "@/types/item.type";
import { Btn } from "@/components/common/Button"
import { toast } from "sonner";
import { useState } from "react";
import { createOrder } from "@/base-api/order";
import { Order } from "@/types/order.type";

export default function OrderModal({ open, setOpen, item, count }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, item: Item, count: number }) {
    if (!open || !item) return null;
    const [formData, setFormData] = useState<Order>({ user_name: "", phone: "", address: "", total_item: count, cost: item.price * count, item_id: item._id})

    const handleOrderPlacement = async () => {
        if (!formData.user_name.trim()) {
            toast("Please enter your name");
            return;
        }

        if (formData.phone.length !== 10) {
            toast("Phone number must be 10 digits");
            return;
        }

        if (!formData.address.trim()) {
            toast("Please enter your address");
            return;
        }
        const res = await createOrder(formData)
        if(res){
            setOpen(false)
            toast("Order create successfully")
        }else{
            toast("Some data are missing")
        }
    }
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center">
            <div className="bg-[#F9F6F2] rounded-lg p-6 w-[400px] rounded-md border-4 border-black">
                <div className="text-black font-bold text-right cursor-pointer text-xl" onClick={() => setOpen(false)}>X</div>
                <h2 className="text-xl font-bold mb-4 text-black">
                    Order {item.name}
                </h2>

                <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.user_name}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            user_name: e.target.value,
                        }))
                    }
                    className="border w-full p-2 rounded mb-3 text-black placeholder:text-black/30"
                />

                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                        }))
                    }
                    className="border w-full p-2 rounded mb-3 text-black placeholder:text-black/30"
                />

                <textarea
                    value={formData.address}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            address: e.target.value,
                        }))
                    }
                    maxLength={200}
                    placeholder="Address"
                    className="border w-full p-2 rounded mb-4 text-black placeholder:text-black/30"
                />
                <h3 className="text-black">Total : <span className="font-bold">{item.price * count} Rupees</span> for <span className="font-bold">{count}</span> items</h3>
                <div className="flex justify-end gap-2">
                    <Btn
                        name="Place Order" onClick={() => handleOrderPlacement()}
                    />
                </div>
            </div>
        </div>
    );
}