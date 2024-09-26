import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import CreateContact from "../CreateContact";

describe("CreateContact", () => {
    it("should render successfully", () => {
        render(<CreateContact addNewContact={jest.fn()}/>);
        expect(screen.getByTestId("create-contact")).toBeTruthy();
    });


it("should have input text element", () => {
    render(<CreateContact addNewContact={jest.fn()} />);
    const inputName = screen.getByPlaceholderText("Full Name");
    const inputEmail = screen.getByPlaceholderText("Email");
    const inputPhone = screen.getByPlaceholderText("Phone");
    const inputNotes = screen.getAllByPlaceholderText("Notes");
    expect(inputName).toBeDefined();
    expect(inputEmail).toBeDefined();
    expect(inputPhone).toBeDefined();
    expect(inputNotes).toBeDefined();
});

// it("should handle click submit", async () => {
//     const user = userEvent.setup();
//     const mockAddNewContact = jest.fn();

//     render(<CreateContact addNewContact={mockAddNewContact}/>);

//     const inputName = screen.getByPlaceholderText("Full Name");
//     await user.type(inputName, "John");
//     const inputEmail = screen.getByPlaceholderText("Email");
//     await user.type(inputEmail, "john@example.com");
//     const inputPhone = screen.getByPlaceholderText("Phone");
//     await user.type(inputPhone, "888-888-8888");
//     const inputNotes = screen.getByPlaceholderText("Notes");
//     await user.type(inputNotes, "Follow up next week.");

//     const submitButton = screen.getByRole("button", { name: /submit/i });
//     await user.click(submitButton);

//     expect(mockAddNewContact).toHaveBeenCalledWith({
//         name: "John",
//         email: "john@example.com",
//         phone: "888-888-8888",
//         notes: "Follow up next week."
//     });

//     });
});

