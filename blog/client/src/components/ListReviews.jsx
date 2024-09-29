import Reviews from "./Review";

function ListReviews({ reviews }) {

    return (
        <div>
            <h3>Review List</h3>
            <ul>
                {reviews.map((reviews) => {
                    return (
                        <li key={reviews.game_id}>
                            {" "}
                            <Reviews reviews={reviews}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ListReviews