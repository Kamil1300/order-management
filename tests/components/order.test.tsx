import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Order } from "@/components/order/Order";

const refreshMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: refreshMock,
  }),
}));

vi.mock("sonner", () => ({
  toast: vi.fn(),
}));

vi.mock("@/base-api/items", () => ({
  getItemById: vi.fn(),
}));

vi.mock("@/base-api/order", () => ({
  cancelOrder: vi.fn(),
  updateOrderStatus: vi.fn(),
}));

vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}));

vi.mock("@/components/common/Button", () => ({
  Btn: ({ name, onClick }: any) => (
    <button onClick={onClick}>{name}</button>
  ),
}));

import { getItemById } from "@/base-api/items";
import { cancelOrder } from "@/base-api/order";
import { toast } from "sonner";

describe("Order Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const order = {
    _id: "order1",
    user_name: "Kamil",
    phone: "9999999999",
    address: "Surat",
    total_item: 2,
    cost: 500,
    item_id: "item1",
    status: "Preparing",
  };

  const item = {
    _id: "item1",
    name: "Pizza",
    description: "Cheese Burst Pizza",
    price: 250,
    image: "/pizza.jpg",
    is_veg: true,
    type: "Pizza",
  };

  it("renders order details", async () => {
    vi.mocked(getItemById).mockResolvedValue(item);

    render(<Order orders={order} enabled={false} />);

    expect(screen.getByText("Kamil")).toBeInTheDocument();
    expect(screen.getByText("Preparing")).toBeInTheDocument();
    expect(await screen.findByText(/Item:\s*Pizza/)).toBeInTheDocument();
    expect(screen.getByText(/500/)).toBeInTheDocument();
    expect(screen.getByText(/Surat/)).toBeInTheDocument();
  });

  it("opens item modal when View Item is clicked", async () => {
    const user = userEvent.setup();

    vi.mocked(getItemById).mockResolvedValue(item);

    render(<Order orders={order} enabled={false} />);

    await screen.findByText(/Item:\s*Pizza/);

    await user.click(
      screen.getByRole("button", {
        name: /View Item/i,
      })
    );

    expect(screen.getByText("Cheese Burst Pizza")).toBeInTheDocument();
    expect(screen.getByText(/Your Order/)).toBeInTheDocument();
  });

  it("cancels order when Cancel button is clicked", async () => {
    const user = userEvent.setup();

    vi.mocked(getItemById).mockResolvedValue(item);

    vi.mocked(cancelOrder).mockResolvedValue({
      status: 200,
      message: "Order cancelled",
    });

    render(<Order orders={order} enabled={false} />);

    await user.click(
      screen.getByRole("button", {
        name: /Cancel/i,
      })
    );

    expect(cancelOrder).toHaveBeenCalledWith("order1");
    expect(toast).toHaveBeenCalledWith("Order cancelled");
    expect(refreshMock).toHaveBeenCalled();
  });

  it("does not show cancel button for cancelled orders", () => {
    render(
      <Order
        orders={{
          ...order,
          status: "Cancelled",
        }}
        enabled={false}
      />
    );

    expect(
      screen.queryByRole("button", {
        name: /Cancel/i,
      })
    ).not.toBeInTheDocument();
  });
});