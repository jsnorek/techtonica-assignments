import React, { useEffect, useReducer, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import * as actions from "../actions/postReview";

function CreateReview({ setCreateReviewFormVisible, allGames = [], addNewReview }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [review, setReview] = useState({
    reviewer_name: "",
    game_id: "",
    rating: "",
    review_text: "",
  });

  // Clear the form 
  const clearForm = () => {
    setReview({
      reviewer_name: "",
      game_id: "",
      rating: "",
      review_text: "",
    });
    setErrorMessage("");
  };

  // Timer for error message
  useEffect(() => {
    setTimeout(() => {
        setErrorMessage("");
    }, 5000);
  },[])

  // Hide create review form
  const handleCreateReviewFormVisible = () => {
    setCreateReviewFormVisible(false);
  };

 // Only map over allGames if it's an array and has data
 const gameOptions = Array.isArray(allGames) && allGames.length > 0
 ? allGames.map((game) => ({
     label: game.title, // Game title displayed in the dropdown
     value: game.game_id, // Game Id used as value
   }))
 : [];

 // If missing game_id or review_text set error, otherwise post new review
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('review before submitting', review);
    if (!review.game_id || !review.review_text) {
        setErrorMessage("Selecting a game and writing a review is required.")
        console.log(errorMessage);
        return;
    }
    try {
      const data = await actions.postReview(review);
      console.log("this is the data", data);
      addNewReview(data);
      clearForm();
      setCreateReviewFormVisible(false);
    } catch (error) {
      setErrorMessage("Failed to submit the review. Please try again.");
      console.error("error submitting review", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  // Handle dropdown change
  const handleDropdownChange = (e) => {
    setReview((prevReview) => ({ ...prevReview, game_id: e.value }));
  };

  console.log('form error message', errorMessage);

  return (
    <div className="create-review-container" data-testid="create-review">
      <form className="create-review-form" onSubmit={handleSubmit}>
        <input
          id="reviewer_name"
          type="text"
          name="reviewer_name"
          placeholder="Reviewer Name"
          maxLength="35"
          value={review.reviewer_name}
          onChange={handleChange}
        />
        <Dropdown
          showClear
          data-testid="game-choice"
          placeholder="Select a game"
          options={gameOptions}
          id="game"
          checkmark
          highlightOnSelect
          value={review.game_id}
          onChange={handleDropdownChange}
        />
        <InputNumber
          id="rating"
          name="rating"
          placeholder="Rating"
          min={1}
          max={10}
          showButtons
          value={review.rating}
          onValueChange={handleChange}
        />
        <textarea
          id="review_text"
          name="review_text"
          placeholder="Write your review here"
          rows="4"
          value={review.review_text}
          onChange={handleChange}
        />
        <Button label="Submit" aria-hidden={false} rounded/>
      </form>
      <Button label="Cancel" onClick={handleCreateReviewFormVisible} rounded/>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
export default CreateReview;
