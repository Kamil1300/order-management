import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    is_veg: { type: Boolean, required: true },
    type: { type: String, required: true }
})

export const Item = models.Item || model("Item", ItemSchema)