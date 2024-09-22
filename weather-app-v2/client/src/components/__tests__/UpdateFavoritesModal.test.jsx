import React from 'react';
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import UpdateFavoritesModal from "../UpdateFavoritesModal";

//test the rendering of updatefavoritesmodal
describe("UpdateFavoritesModal", () => {
    it("should render successfully", () => {
        render(<UpdateFavoritesModal onSave={jest.fn()}
            onCancel={() => jest.fn(false)} />);
        expect(screen.getByTestId("update-favorites-modal")).toBeTruthy();
        // unmount();
    });

it("should have input text element", () => {
    render(<UpdateFavoritesModal onSave={jest.fn()}
    onCancel={() => jest.fn(false)} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeDefined();
});

it("should handle update favorite location change", async () => {
    const user = userEvent.setup();
    const mockOnSave = jest.fn();
    const mockOnCancel = jest.fn();

    render(<UpdateFavoritesModal onSave={mockOnSave} onCancel={() => mockOnCancel(false)}/>);
    // render(<UpdateFavoritesModal onSave={mockOnSave}/>);

    const inputElement = screen.getByRole("textbox");
    await user.type(inputElement, "Sonoma");

    const updateButton = screen.getByText("Update");
    await user.click(updateButton);

    const cancelButton = screen.getByText("Cancel");
    await user.click(cancelButton);

    expect(mockOnSave).toBeCalledWith("Sonoma");
    expect(mockOnCancel).toHaveBeenCalledTimes(1);

})

})