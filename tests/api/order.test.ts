import { describe, it, expect, vi, beforeEach } from "vitest";

const {
  saveMock,
  findMock,
  findByIdMock,
  findByIdAndUpdateMock,
  updateOneMock,
} = vi.hoisted(() => ({
  saveMock: vi.fn(),
  findMock: vi.fn(),
  findByIdMock: vi.fn(),
  findByIdAndUpdateMock: vi.fn(),
  updateOneMock: vi.fn(),
}));


vi.mock("@/database/db", () => ({
  connectDB: vi.fn(),
}));


vi.mock("@/database/schema/order", () => ({
  Order: Object.assign(
    vi.fn(function (this: any, data) {
      Object.assign(this, data);
      this.save = saveMock;
    }),
    {
      find: findMock,
      findById: findByIdMock,
      findByIdAndUpdate: findByIdAndUpdateMock,
      updateOne: updateOneMock,
    }
  ),
}));

import { POST, GET, PATCH, PUT } from "@/app/api/order/route";
import { Order } from "@/database/schema/order";

describe("Order API", () => {
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
      item_id: "123",
    };

    saveMock.mockResolvedValue({
      ...body,
      _id: "abc123",
      status: "Order Received",
    });
    const req = {
      json: vi.fn().mockResolvedValue(body),
    } as any;
    const response = await POST(req);
    const data = await response?.json();
    expect(Order).toHaveBeenCalledOnce();
    expect(saveMock).toHaveBeenCalledOnce();
    expect(data.status).toBe(200);
    expect(data.data).toMatchObject(body);

  });

  it("POST fails when required fields are missing", async () => {
    const req = {
      json: vi.fn().mockResolvedValue({
        user_name: "",
        phone: "",
        address: "",
      }),
    } as any;
    const response = await POST(req);
    const data = await response?.json();
    expect(data.status).toBe(400);
    expect(data.message).toBe(
      "Some information's are missing"
    );
  });

  it("gets orders successfully", async () => {
    const orders = [
      {
        _id: "1",
        user_name: "Kamil",
        status: "Preparing",
      },
    ];
    findMock.mockReturnValue({
      sort: vi.fn().mockReturnValue({
        limit: vi.fn().mockResolvedValue(orders),
      }),
    });
    const response = await GET();
    const data = await response?.json();
    expect(findMock).toHaveBeenCalledOnce();
    expect(data.status).toBe(200);
    expect(data.data).toEqual(orders);
  });

  it("GET returns no data", async () => {
    findMock.mockReturnValue({
      sort: vi.fn().mockReturnValue({
        limit: vi.fn().mockResolvedValue([]),
      }),
    });
    const response = await GET();
    const data = await response?.json();
    expect(data.status).toBe(400);
    expect(data.message).toBe(
      "Data not found"
    );
  });

  it("cancels order successfully", async () => {
    findByIdMock.mockResolvedValue({
      _id: "123",
      status: "Preparing",
    });
    findByIdAndUpdateMock.mockResolvedValue({
      _id: "123",
      status: "Cancelled",
    });
    const req = {
      json: vi.fn().mockResolvedValue({
        id: "123",
      }),
    } as any;
    const response = await PATCH(req);
    const data = await response?.json();
    expect(findByIdMock).toHaveBeenCalledWith({
      _id: "123",
    });
    expect(findByIdAndUpdateMock).toHaveBeenCalled();
    expect(data.status).toBe(200);
    expect(data.message).toBe(
      "Order cancelled"
    );
  });

  it("PATCH fails without id", async () => {
    const req = {
      json: vi.fn().mockResolvedValue({})
    } as any;
    const response = await PATCH(req);
    const data = await response?.json();
    expect(data.status).toBe(400);
    expect(data.message).toBe(
      "ID is required"
    );
  });

  it("PATCH detects already cancelled order", async () => {
    findByIdMock.mockResolvedValue({
      status: "Cancelled",
    })
    const req = {
      json: vi.fn().mockResolvedValue({
        id:"123"
      }),
    } as any;
    const response = await PATCH(req);
    const data = await response?.json();
    expect(data.status).toBe(200);
    expect(data.message).toBe(
      "Order is already Cancelled"
    );
  });

  it("updates order status flow", async () => {

    findMock.mockResolvedValue([
      {
        _id:"1",
        status:"Order Received",
      },
      {
        _id:"2",
        status:"Preparing",
      },
    ]);
    updateOneMock.mockResolvedValue({});
    const response = await PUT();
    const data = await response?.json();
    expect(findMock).toHaveBeenCalled();
    expect(updateOneMock)
      .toHaveBeenCalledTimes(2);
    expect(data.message).toBe(
      "Order statuses updated successfully"
    );
  });

  it("PUT returns when no active orders exist", async () => {
    findMock.mockResolvedValue([]);
    const response = await PUT();
    const data = await response?.json();
    expect(data.message).toBe(
      "No active orders found"
    );
    expect(data.data).toEqual([]);
  });
});