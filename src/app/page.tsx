import { getItems } from "@/base-api/items";
import { Card } from "@/components/common/Card"
import { Item } from "@/types/item.type";
export default async function Home() {
  const items = await getItems()
  return (
    <div>
      <div className="text-center pt-8 font-extrabold text-2xl">
        <h1>RaftLab's Special Canteen</h1>
      </div>
      <div className="flex mx-30 my-20 font-sans flex-wrap gap-10">
        {items.map((item: Item) => (
          <Card items={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}
