import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import Review from "../Review";

describe("Review", () => {
    it("should render successfully", () => {
        const mockReviews = [
            {
                review_id: 1,
                reviewer_name: "Michael Scott",
                game_id: 1,
                rating: 9,
                review_text: "wonderful game, would recommend."
            }
        ];

        render(<Review reviews={mockReviews} setGameDetailsVisible={jest.fn()} onClickHandleGameDetailsVisible={jest.fn()} onDelete={jest.fn()} summarizeReview={jest.fn()} summarizedReview={""}/>)
        expect(screen.getByTestId("review-cards")).toBeTruthy();
    });
});