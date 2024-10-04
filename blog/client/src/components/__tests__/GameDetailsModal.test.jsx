
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import GameDetailsModal from "../GameDetailsModal";

jest.mock('primereact/button', () => ({
    Button: (props) => <button {...props}>{props.label}</button>
}));

jest.mock('primereact/card', () => ({
    Card: ({ children }) => <div>{children}</div>
}));

describe("GameDetailsModal", () => {
    it("should render successfully", () => {
        render(<GameDetailsModal setGameDetailsVisible={jest.fn()} gameDetails={[]} />)
        expect(screen.getByTestId("game-details-modal")).toBeTruthy();
    });
});