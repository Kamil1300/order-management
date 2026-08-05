import { connectDB } from "@/database/db";
import { Order } from "@/database/schema/order";
import { NextRequest, NextResponse } from "next/server";
connectDB()
export const POST = async (req: NextRequest) => {
    try {
        const { user_name, phone, address, total_item, cost, item_id } = await req.json()
        if (!user_name || !phone || !address || !total_item || !cost) {
            return NextResponse.json({ message: "Some information's are missing", status: 400 })
        }
        console.log(user_name, "From backend")
        const order = new Order({
            user_name,
            phone,
            address,
            total_item,
            cost,
            item_id
        })

        const saveOrder = await order.save()
        console.log("🚀 ~ POST ~ saveOrder:", saveOrder)
        return NextResponse.json({ data: saveOrder, status: 200 })
    } catch (error) {
        console.error(error)
    }
}

export const GET = async () => {
    try {
        const orders = await Order.find()
        if (orders.length == 0) {
            return NextResponse.json({ message: "Data not found", status: 400 })
        }
        return NextResponse.json({ data: orders, status: 200 })
    } catch (error) {
        console.error(error)
    }
}

export const PATCH = async (req: NextRequest) => {
    try {
        const { id } = await req.json()
        if (!id) {
            return NextResponse.json({ message: "ID is required", status: 400 })
        }
        const status = await Order.findByIdAndUpdate(
            { _id: id },
            { status: "Cancelled" },
            { new: true, runValidators: true }
        )

        return NextResponse.json({ message: "Order cancelled", status: 200 })
    } catch (error) {
        console.error(error)
    }
}