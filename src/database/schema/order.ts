import { Schema, model, models } from "mongoose"

const OrderSchema = new Schema({
    user_name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    item_id: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    status: {
        type: String,
        enum: [
            "Order Received",
            "Preparing",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
        ],
        default: "Order Received",
        required: true,
    },
    total_item: {
        type: Number, reuqired: true
    },
    cost: { type: Number, required: true }
},{timestamps:true,})

export const Order = models.Order || model("Order", OrderSchema)