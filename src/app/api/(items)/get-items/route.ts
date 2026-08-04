import { connectDB } from "@/database/db";
import { Item } from "@/database/schema/items";
import { NextResponse } from "next/server";

export const GET = async() => {
    await connectDB()
    const items = await Item.find()
    return NextResponse.json(items,{status:200})
}