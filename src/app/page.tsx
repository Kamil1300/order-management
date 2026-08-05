import Item from "@/components/item/Item";
import { getItems } from "@/base-api/items";
import { Item as ItemType} from "@/types/item.type";

export default async function Items() {
  const items = await getItems()
  return (
    <div>
      <Item items={items as ItemType[]}/>
    </div>
  );
}
