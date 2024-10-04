
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import CreateReview from "../CreateReview";
import * as actions from "../../actions/postReview";

//to fix css parsing error
const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

const initialProps = {
    addNewReview: jest.fn()
}

const init = (props = initialProps) => {
    return {
        user: userEvent.setup(),
        ...render(<CreateReview {...props} />)
    }
}

describe("CreateReview", () => {
    it("should render successfully", () => {
        init();
        expect(screen.getByTestId("create-review")).toBeTruthy();
    });

    it("it should have input text element", () => {
        init()
        const inputReviewerName = screen.getByPlaceholderText("Reviewer Name");
        const inputGame = screen.getByTestId("game-choice");
        const inputRating = screen.getByPlaceholderText("Rating");
        const inputReviewText = screen.getByPlaceholderText("Write your review here");
        expect(inputReviewerName).toBeDefined();
        expect(inputGame).toBeDefined();
        expect(inputRating).toBeDefined();
        expect(inputReviewText).toBeDefined();
    });

    it("should not submit when user doesn't enter game choice or review text", async () => {
        const mockPostReview = jest.spyOn(actions, "postReview");

        const { user } = init();

        const inputReviewerName = screen.getByPlaceholderText("Reviewer Name");
        await user.type(inputReviewerName, "Michael Scott");

        const inputRating = screen.getByPlaceholderText("Rating");
        await user.type(inputRating, "9");

        const submitButton = screen.getByRole("button", { name: /submit/i });
        await user.click(submitButton);

        expect(mockPostReview).not.toBeCalled();
    });

    // it("should handle click submit", async () => {
    //     const expectedResult = {
    //         reviewer_name: "Michael Scott",
    //         rating: "10",
    //         game_id: "4",
    //         review_text: "The best game ever."
    //     };
    //     const mockPostActions = jest.spyOn(actions, "postReview");
    //     mockPostActions.mockResolvedValue(expectedResult);

    //     const mockAddNewReview = jest.fn();

    //     const { user } = init({ addNewReview: mockAddNewReview, allGames: [{ game_id: "4", title: "The Legend of Zelda: Windwaker" }] });

    //     const inputReviewerName = screen.getByPlaceholderText("Reviewer Name");
    //     await user.type(inputReviewerName, "Michael Scott");
    //     const inputGame = screen.getByTestId("game-choice");
    //     await user.click(inputGame);
    //     await user.selectOptions(inputGame, "The Legend of Zelda: Windwaker");
    //     const inputRating = screen.getByPlaceholderText("Rating");
    //     await user.type(inputRating, "10");
    //     const inputReviewText = screen.getByPlaceholderText("Write your review here");
    //     await user.type(inputReviewText, "The best game ever.");

    //     const submitButton = screen.getByRole("button", { name: /submit/i });
    //     await user.click(submitButton);

    //     expect(mockAddNewReview).toHaveBeenCalledWith(expectedResult);
    // });
});