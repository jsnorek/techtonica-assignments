import React, { useState } from "react";

//add userId as a prop?
function UpdateFavoritesModal({ onSave, onCancel }) {

  const [formValues, setFormValues] = useState({
    favorite_city: ""
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:8080//users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
        });
        if (!response.ok) {
            throw new Error("Failed to update the user");
        }
        const updatedUser = await response.json();
        console.log("user updated:", updatedUser);

        // onSave(updatedUser);
            onSave(formValues.favorite_city);
    } catch (error) {
        console.error("error updating the user:", error);
    }
  };

  return (
    <div className="modal-container" data-testid="update-favorites-modal">
      <div className="update-favorites-modal">
        <form onSubmit={handleFormSubmit}>
            <h2>Update your Favorite Location</h2>
            <input
            type="text"
            name="favorite_city"
            placeholder="Favorite location"
            required
            onChange={handleInputChange}
            value={formValues.favorite_city}
            />
            <button onClick={() => onSave(formValues.favorite_city)}>Update</button>
            <button onClick={onCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
export default UpdateFavoritesModal;
