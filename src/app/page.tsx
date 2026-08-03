import { getItems } from "@/base-api/items";
import { Card } from "@/components/common/Card"
import { Item } from "@/types/item.type";
export default async function Home() {
  const items = await getItems()
  return (
    <div>
      <div className="text-center pt-8 font-extrabold text-2xl text-black">
        <h1>RaftLab's Special Canteen</h1>
      </div>
      {/* Burgers  */}
        <h3 className="text-center mt-15 font-extrabold text-xl text-black">Burgers🍔</h3>
      <div className="flex mx-30 mb-20 mt-10 font-sans flex-wrap gap-10 justify-center items-center">
        {items.map((item: Item) => (
          item.type == "burger" &&
          <Card items={item} key={item._id} />
        ))}
      </div>
      {/* Pizzas  */}
      <h3 className="text-center mt-15 font-extrabold text-xl text-black">Pizza🍕</h3>
      <div className="flex mx-30 mb-20 mt-10 font-sans flex-wrap gap-10 justify-center items-center">
        {items.map((item: Item) => (
          item.type == "pizza" &&
          <Card items={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}
