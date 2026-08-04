import { connectDB } from "@/database/db";
import { Item } from "@/database/schema/items";
import { NextRequest, NextResponse } from "next/server";
connectDB()
export const GET = async () => {
    const items = await Item.find()
    if(items.length == 0){
        return NextResponse.json({message:"Data not found",status:404})
    }
    return NextResponse.json({data:items, status: 200 })
}

export const POST = async (req: NextRequest) => {
    const {id} = await req.json()
    if(!id){
        return NextResponse.json({message: "Id not found",status:404})
    }
    console.log(id,"id is here")
    const item = await Item.findOne({_id:id})
    return NextResponse.json({data:item, status: 200 })
}