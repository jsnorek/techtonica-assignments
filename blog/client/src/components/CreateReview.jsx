import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import * as actions from "../actions/postReview";

function CreateReview({ setCreateReviewFormVisible, allGames, addNewReview }) {

    const [errorMessage, setErrorMessage] = useState("");
    const [review, setReview] = useState({
        reviewer_name: "",
        game_id: "",
        rating: "",
        review_text: "", 
    });

    const clearForm = () => {
        setReview({
            reviewer_name: "",
            game_id: "",
            rating: "",
            review_text: "", 
        })
        setErrorMessage("");
    };

    const handleCreateReviewFormVisible = () => {
        setCreateReviewFormVisible(false);
    };

    //Map over allGames to create an array of options for the dropdown
   const gameOptions = allGames.map((game) => ({
        label: game.title, // Game title displayed in the dropdown
        value: game.game_id, // Game Id used as value
   }));
   

   const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.game_id) {
        setErrorMessage("Choosing a game is required.")
        console.log(errorMessage);
        return;
    } 
    const data = await actions.postReview(review);
    console.log("this is the data", data);
    addNewReview(data);
    clearForm();
   };

   const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({...prevReview, [name]: value }));
   };

   const handleDropdownChange = (e) => {
    setReview((prevReview) => ({...prevReview, game_id: e.value}));
   };


    return (
        <div className="create-review-container">
            <form className="create-review-form">
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
                    showClear placeholder="Select a game"
                    options={gameOptions}
                    id="game"
                    checkmark={true}
                    highlightOnSelect={true}
                    value={review.game_id}
                    onChange={handleDropdownChange}
                />
                <input
                    id="rating"
                    type="number"
                    name="rating"
                    placeholder="Rating"
                    min="1"
                    max="10"
                    value={review.rating}
                    onChange={handleChange}

                />
                 {/* <InputNumber
                    id="rating"
                    type="number"
                    name="rating"
                    placeholder="Rating"
                    mode="decimal" 
                    showButtons min={0} max={10}
                /> */}
                 <textarea
                    id="review_text"
                    name="review_text"
                    placeholder="Write your review here"
                    rows="4"
                    value={review.review_text}
                    onChange={handleChange}
                />
                <Button label="Submit" onClick={handleSubmit}/>
            </form>
            <Button label="Cancel" onClick={handleCreateReviewFormVisible}/>
        </div>
    )
}
export default CreateReview;