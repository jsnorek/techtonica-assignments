import React from 'react';
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import SearchBar from "../SearchBar";




// const initialProps = {
//   setLocation: jest.fn(),
// };

describe("SearchBar", () => {
  it("should render successfully", () => {
    render(<SearchBar setLocation={jest.fn()} />);
    expect(screen.getByTestId("search-bar")).toBeTruthy();
  });

  it("should have input text element", () => {
    render(<SearchBar setLocation={jest.fn()} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeDefined(); 
  })

  it("should handle click search", async () => {
    const user = userEvent.setup();
    const mockSetLocation = jest.fn();

    render(<SearchBar setLocation={mockSetLocation} />);

    // typing into input
    const inputElement = screen.getByRole("textbox");
    await user.type(inputElement, "Sonoma");

    // clicking search 
    const searchButton = screen.getByRole("button", { name: "Search" });
    await user.click(searchButton);

    expect(mockSetLocation).toBeCalledWith("Sonoma");
  })
});
