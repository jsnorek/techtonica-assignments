import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React from "react";

//the details that pop up for each contact
function ViewContactDetails({ contactDetails ,setContactDetailsVisible }) {

    const turnContactDetailsVisibleOff = () => {
        setContactDetailsVisible(false);
      };

      // Check if the contact details exist and are an array
    const details = contactDetails && contactDetails.length > 0 ? contactDetails[0] : null;

// console.log('chosen contact details', contactDetails);
// console.log('chosen contact details sectioned out', details);
    return (
        <div className="viewContactDetailsContainer">
            <div className="contactDetailsModal">
                <h2>Contact Details</h2>
                <div>
                    <Card>
                        {details ? (
                            <>
                                 <p>Name: {details.name}</p>
                                <p>Company: {details.company}</p>
                                <p>Job Title: {details.job_title}</p>
                                <p>Birthday: {new Date(details.birthday).toLocaleDateString()}</p>
                            </>
                        ) : (
                            <p>No contact details available</p>
                        )}
                        <Button label="Back" onClick={turnContactDetailsVisibleOff}/>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ViewContactDetails;