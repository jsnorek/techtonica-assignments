import axios from "axios";
import Review from "./Review";

// To fix parsing error
const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

function ListReviews({
  reviews,
  setGameDetailsVisible,
  onClickHandleGameDetailsVisible,
  setReviews,
  summarizeReview,
  summarizedReview
}) {

    //Handle deleting reviews
  const onDelete = (reviewId) => {
    axios
      .delete(`http://localhost:8080/reviews/${reviewId}`)
      .then((response) => {
        if (response.status === 200) {
          setReviews((prevReviews) =>
            prevReviews.filter((review) => review.review_id !== reviewId)
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting review: ", error);
      });
  };

  return (
    <div data-testid="list-reviews">
      <h3>Review List</h3>
      <ul>
        {reviews.map((reviews) => {
          return (
            <li key={reviews.review_id}>
              {" "}
              <Review
                reviews={reviews}
                setGameDetailsVisible={setGameDetailsVisible}
                onClickHandleGameDetailsVisible={
                  onClickHandleGameDetailsVisible
                }
                onDelete={onDelete}
                summarizeReview={summarizeReview}
                summarizedReview={summarizedReview}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListReviews;
