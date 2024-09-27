import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import CreateContact from "../CreateContact";
import * as actions from "../../actions/postContacts";

const initialProps = {
  addNewContact: jest.fn()
}

const init = (props = initialProps) => {
  return {
    user: userEvent.setup(),
    ...render(<CreateContact {...props} />)
  }
}

describe("CreateContact", () => {
  
  it("should render successfully", () => {
    init();
    expect(screen.getByTestId("create-contact")).toBeTruthy();
  });

  it("should have input text element", () => {
    init()
    const inputName = screen.getByPlaceholderText("Full Name");
    const inputEmail = screen.getByPlaceholderText("Email");
    const inputPhone = screen.getByPlaceholderText("Phone");
    const inputNotes = screen.getAllByPlaceholderText("Notes");
    expect(inputName).toBeDefined();
    expect(inputEmail).toBeDefined();
    expect(inputPhone).toBeDefined();
    expect(inputNotes).toBeDefined();
  });

  it("should show error message when user doesn't enter name", async () => {
    const mockPostActions = jest.spyOn(actions, "postContacts");

    const { user } = init();
    
    const inputPhone = screen.getByPlaceholderText("Phone");
    await user.type(inputPhone, "888-888-8888");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByText("Name and Phone are required fields.")).toBeDefined();
    expect(mockPostActions).not.toBeCalled();
  });

  it("should show error message when user doesn't enter phone", async () => {
    const mockPostActions = jest.spyOn(actions, "postContacts");

    const { user } = init();

    const inputName = screen.getByPlaceholderText("Full Name");
    await user.type(inputName, "Michael Scott");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByText("Name and Phone are required fields.")).toBeDefined();
    expect(mockPostActions).not.toBeCalled();
  })

  it("should handle click submit", async () => {
    const expectedResult = {
      name: "John",
      email: "john@example.com",
      phone: "888-888-8888",
      notes: "Follow up next week.",
    };
    const mockPostActions = jest.spyOn(actions, "postContacts");
    mockPostActions.mockResolvedValue(expectedResult);

    const mockAddNewContact = jest.fn();

    const { user } = init({ addNewContact: mockAddNewContact });

    const inputName = screen.getByPlaceholderText("Full Name");
    await user.type(inputName, "John");
    const inputEmail = screen.getByPlaceholderText("Email");
    await user.type(inputEmail, "john@example.com");
    const inputPhone = screen.getByPlaceholderText("Phone");
    await user.type(inputPhone, "888-888-8888");
    const inputNotes = screen.getByPlaceholderText("Notes");
    await user.type(inputNotes, "Follow up next week.");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    expect(mockAddNewContact).toHaveBeenCalledWith(expectedResult);
  });
});
