import { connectDB } from "@/database/db";
import { Order } from "@/database/schema/order";
import { NextRequest, NextResponse } from "next/server";
connectDB()
export const dynamic = "force-dynamic";
export const POST = async (req: NextRequest) => {
    try {
        const { user_name, phone, address, total_item, cost, item_id } = await req.json()
        if (!user_name || !phone || !address || !total_item || !cost) {
            return NextResponse.json({ message: "Some information's are missing", status: 400 })
        }

        const order = new Order({
            user_name,
            phone,
            address,
            total_item,
            cost,
            item_id
        })

        const saveOrder = await order.save()
        return NextResponse.json({ data: saveOrder, status: 200 })
    } catch (error) {
        console.error(error)
    }
}

export const GET = async () => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }).limit(10)
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
        const checkStatus = await Order.findById({ _id: id })
        if (checkStatus.status == "Cancelled") {
            return NextResponse.json({ message: "Order is already Cancelled", status: 200 })
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

const STATUS_FLOW = [
    "Order Received",
    "Preparing",
    "Out for Delivery",
    "Delivered",
] as const;

export const PUT = async () => {
    try {
        await connectDB();

        const orders = await Order.find({
            status: {
                $nin: ["Delivered", "Cancelled"],
            },
        });

        if (orders.length === 0) {
            return NextResponse.json(
                {
                    message: "No active orders found",
                    data: [],
                },
                { status: 200 }
            );
        }

        const updates = [];

        for (const order of orders) {
            const currentIndex = STATUS_FLOW.indexOf(order.status);

            if (
                currentIndex !== -1 &&
                currentIndex < STATUS_FLOW.length - 1
            ) {
                updates.push(
                    Order.updateOne(
                        { _id: order._id },
                        {
                            status: STATUS_FLOW[currentIndex + 1],
                        }
                    )
                );
            }
        }

        await Promise.all(updates);

        return NextResponse.json(
            {
                message: "Order statuses updated successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
};