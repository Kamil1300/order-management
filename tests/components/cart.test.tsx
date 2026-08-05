// tests/components/order.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Cart } from "@/components/cart/Cart";
import { getItemById } from "@/base-api/items";

const pushMock = vi.fn();

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}));

// Mock Button
vi.mock("@/components/common/Button", () => ({
  Btn: ({ name, onClick }: any) => (
    <button onClick={onClick}>{name}</button>
  ),
}));

// Mock API
vi.mock("@/base-api/items", () => ({
  getItemById: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("@/base-api/order", () => ({
  createOrder: vi.fn().mockResolvedValue({
    status: 200,
    message: "Order placed successfully",
  }),
}));

describe("Cart", () => {
  const item = {
    _id: "1",
    name: "Pizza",
    description: "Cheese Burst Pizza",
    price: 299,
    image: "/pizza.jpg",
    is_veg: true,
    type: "Pizza",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getItemById).mockResolvedValue(item);
  });

  it("renders fetched item", async () => {
    render(<Cart id="1" />);

    expect(await screen.findByText("Cheese Burst Pizza")).toBeInTheDocument();
    expect(screen.getByText(/Single Item price/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /check out/i })
    ).toBeInTheDocument();
  });

  it("increments and decrements quantity", async () => {
    const user = userEvent.setup();

    render(<Cart id="1" />);

    await screen.findByText("Cheese Burst Pizza");

    // Initial quantity
    expect(screen.getByText("1")).toBeInTheDocument();

    // Increase
    await user.click(screen.getByRole("button", { name: "+" }));

    expect(screen.getByText("2")).toBeInTheDocument();

    expect(
      screen.getByText((_, element) =>
        element?.textContent === "Total Item Price: 598"
      )
    ).toBeInTheDocument();

    // Decrease
    await user.click(screen.getByRole("button", { name: "-" }));

    expect(screen.getByText("1")).toBeInTheDocument();

    expect(
      screen.getByText((_, element) =>
        element?.textContent === "Total Item Price: 299"
      )
    ).toBeInTheDocument();
  });

  it("opens checkout modal", async () => {
    const user = userEvent.setup();

    render(<Cart id="1" />);

    await screen.findByText("Cheese Burst Pizza");

    await user.click(
      screen.getByRole("button", { name: /check out/i })
    );

    expect(
      screen.getByPlaceholderText(/your name/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/phone number/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/address/i)
    ).toBeInTheDocument();
  });

it("navigates to orders page after placing an order", async () => {
  const user = userEvent.setup();

  render(<Cart id="1" />);

  await screen.findByText("Cheese Burst Pizza");

  // Open checkout modal
  await user.click(
    screen.getByRole("button", { name: /check out/i })
  );

  // Fill form
  await user.type(
    screen.getByPlaceholderText(/your name/i),
    "John Doe"
  );

  await user.type(
    screen.getByPlaceholderText(/phone number/i),
    "9876543210"
  );

  await user.type(
    screen.getByPlaceholderText(/address/i),
    "123 Main Street"
  );

  // Place order
  await user.click(
    screen.getByRole("button", { name: /place order/i })
  );

  expect(pushMock).toHaveBeenCalledWith("/orders");
});
});