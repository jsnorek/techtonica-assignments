import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import ListReviews from "../ListReviews";

describe("ListReview", () => {
    it("should render successfully", () => {
        //reviews is not a function, it is an array of objects so we need to create and pass an example
        const mockReviews = [
            {
                review_id: 1,
                reviewer_name: "Michael Scott",
                game_id: 1,
                rating: 9,
                review_text: "wonderful game, would recommend."
            }
        ];

        render(<ListReviews 
                    reviews={mockReviews} 
                    setGameDetailsVisible={jest.fn()} 
                    onClickHandleGameDetailsVisible={jest.fn()}
                    setReviews={jest.fn()}
                    summarizeReview={jest.fn()}
                    summarizedReview={jest.fn()}
                    />)
        expect(screen.getByTestId("list-reviews")).toBeTruthy();
    });
});