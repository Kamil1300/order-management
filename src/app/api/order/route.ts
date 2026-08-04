import { connectDB } from "@/database/db";
import { Order } from "@/database/schema/order";
import { NextRequest, NextResponse } from "next/server";
connectDB()
export const POST = async (req: NextRequest) => {
    try {
        const { user_name, phone, address, total_item, cost, item_id } = await req.json()
        if (!user_name || !phone || !address || !total_item || !cost) {
            return NextResponse.json({ message: "Some information's are missing", status: 404 })
        }
        console.log(user_name,"From backend")
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