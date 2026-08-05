export interface Order{
    _id?:string,
    user_name: string,
    phone: string,
    address: string,
    total_item: number,
    cost: number,
    item_id:string,
    status?:string
}