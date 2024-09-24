import { Button } from "primereact/button";
import React from "react";

//the details that pop up for each contact
function ViewContactDetails({ setContactDetailsVisible }) {

    const turnContactDetailsVisibleOff = () => {
        setContactDetailsVisible(false);
      };

    return (
        <div className="viewContactDetailsContainer">
            <div className="contactDetailsModal">
                <h2>Contact Details</h2>
                <Button label="Back" onClick={turnContactDetailsVisibleOff}/>
            </div>
        </div>
    )
}

export default ViewContactDetails;