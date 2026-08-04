import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/api/(items)/get-items/route";
import { Item } from "@/database/schema/items";

vi.mock("@/database/db", () => ({
  connectDB: vi.fn(),
}));

vi.mock("@/database/schema/items", () => ({
  Item: {
    find: vi.fn(),
  },
}));

describe("GET /api/get-items", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns all menu items", async () => {
    const mockItems = [
      {
        _id: "1",
        image: "/pizza.jpg",
        name: "Pizza",
        description: "Cheese Burst Pizza",
        price: 299,
        is_veg: true,
        type: "Pizza",
      },
    ];

    vi.mocked(Item.find).mockResolvedValue(mockItems);

    const response = await GET();

    expect(Item.find).toHaveBeenCalledOnce();
    expect(response?.status).toBe(200);

    const data = await response?.json();

    expect(data.data).toEqual(mockItems);
  });
});