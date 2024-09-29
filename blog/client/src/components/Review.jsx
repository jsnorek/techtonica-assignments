import { Button } from "primereact/button";
import { Card } from "primereact/card";

function Reviews({ reviews }) {

    return (
            <div className="review-cards">
                <Card title={reviews.title}>
                <p>{reviews.rating}</p>
                <p>"{reviews.review_text}"</p>
                <p>-{reviews.reviewer_name}</p>
                <p>{reviews.review_date}</p>
                </Card>
                <Button label="Game Details"/>
            </div>
    )
}

export default Reviews;