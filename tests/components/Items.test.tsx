// tests/components/Card.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Card } from "@/components/item/Card";
const pushMock = vi.fn();

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}));

// Mock your Button component
vi.mock("@/components/common/Button", () => ({
  Btn: ({ name, onClick }: any) => (
    <button onClick={onClick}>{name}</button>
  ),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("Card", () => {
  const item = {
    _id: "1",
    name: "Pizza",
    description: "Cheese Burst Pizza",
    price: 299,
    image: "/pizza.jpg",
    is_veg: true,
    type: "Pizza",
  };

  it("renders the card details", () => {
    render(<Card items={item} />);

    expect(screen.getByText("Cheese Burst Pizza")).toBeInTheDocument();
    expect(screen.getByText(/299 rupees/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /buy/i })
    ).toBeInTheDocument();
  });

  it("navigates to cart page when Buy button is clicked", async () => {
  const user = userEvent.setup();

  render(<Card items={item} />);

  await user.click(
    screen.getByRole("button", { name: /buy/i })
  );

  expect(pushMock).toHaveBeenCalledWith(`cart/${item._id}`);
});
});