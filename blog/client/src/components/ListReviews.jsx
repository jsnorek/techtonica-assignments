import Review from "./Review";

function ListReviews({ reviews, setGameDetailsVisible, onClickHandleGameDetailsVisible }) {

    return (
        <div>
            <h3>Review List</h3>
            <ul>
                {reviews.map((reviews) => {
                    return (
                        <li key={reviews.review_id}>
                            {" "}
                            <Review 
                            reviews={reviews}
                            setGameDetailsVisible={setGameDetailsVisible}
                            onClickHandleGameDetailsVisible={onClickHandleGameDetailsVisible}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default ListReviews