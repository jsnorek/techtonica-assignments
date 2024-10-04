import { Button } from "primereact/button";
import { Card } from "primereact/card";
import GameDetailsModal from "./GameDetailsModal";

function Reviews({
  reviews,
  setGameDetailsVisible,
  onClickHandleGameDetailsVisible,
  onDelete,
  summarizeReview,
  summarizedReview
}) {
  if (!reviews) {
    return <div>Loading...</div>;
  }

  return (
    <div className="review-cards" data-testid="review-cards">
      <Card title={reviews.title}>
        <p>Rating: {reviews.rating}</p>
        <p>"{reviews.review_text}"</p>
        <p>-{reviews.reviewer_name}</p>
        <p>
          Review Posted: {new Date(reviews.review_date).toLocaleDateString()}
        </p>
      </Card>
      <Button
        label="Game Details"
        onClick={() => onClickHandleGameDetailsVisible(reviews.game_id)}
      />
      <Button label="Delete" onClick={() => onDelete(reviews.review_id)}/>
      <Button label="Summarize" onClick={() => summarizeReview(reviews.review_text)}/>
    </div>
  );
}

export default Reviews;
