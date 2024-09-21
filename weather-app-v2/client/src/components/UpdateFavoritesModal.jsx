import React, { useState } from "react";

function UpdateFavoritesModal({ onSave, onCancel }) {

  const [formValues, setFormValues] = useState("")
    
  const handleInputChange = (e) => {
    setFormValues(e.target.value);
  }

  return (
    <div className="modal-container">
      <div className="update-favorites-modal">
        <input
          type="text"
          name="updateFavoriteLocation"
          placeholder="Update your favorite location"
          required
          onChange={handleInputChange}
          value={formValues}
        />
        <button onClick={() => onSave(formValues)}>Update</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
export default UpdateFavoritesModal;
