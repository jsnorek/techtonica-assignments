export const postReview = async (newReview) => {
    const response = await fetch("http://localhost:8080/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
    });
    if (!response.ok) {
        throw new Error("Failed to submit form. Please try again.");
    }

    const data = await response.json()
    return data;
};