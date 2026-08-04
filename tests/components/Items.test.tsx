// tests/components/Card.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Card } from "@/components/item/Card";

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

  it("Buy button is clickable", async () => {
    const user = userEvent.setup();
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    render(<Card items={item} />);

    await user.click(
      screen.getByRole("button", { name: /buy/i })
    );

    expect(logSpy).toHaveBeenCalledWith("1");

    logSpy.mockRestore();
  });
});