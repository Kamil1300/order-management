import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/order/route";
import { Order } from "@/database/schema/order";

vi.mock("@/database/db", () => ({
  connectDB: vi.fn(),
}));

const saveMock = vi.fn();

vi.mock("@/database/schema/order", () => ({
  Order: vi.fn(function (this: any, data) {
    Object.assign(this, data);
    this.save = saveMock;
  }),
}));

describe("POST /api/order", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a new order", async () => {
    const body = {
      user_name: "Kamil",
      phone: "9999999999",
      address: "Surat",
      total_item: 2,
      cost: 500,
      item_id: ["1"],
    };

    saveMock.mockResolvedValue(body);

    const req = {
      json: vi.fn().mockResolvedValue(body),
    } as any;

    const response = await POST(req);

    expect(Order).toHaveBeenCalledOnce();
    expect(saveMock).toHaveBeenCalledOnce();

    const data = await response?.json();

    expect(data.data).toEqual(body);
    expect(data.status).toBe(200);
  });
});