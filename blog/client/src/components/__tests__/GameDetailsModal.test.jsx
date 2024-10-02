import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import GameDetailsModal from "../GameDetailsModal";

describe("GameDetailsModal", () => {
    it("should render successfully", () => {
        render(<GameDetailsModal setGameDetailsVisible={jest.fn()} gameDetails={jest.fn()}/>)
        expect(screen.getByTestId("game-details-modal"))
    });
})