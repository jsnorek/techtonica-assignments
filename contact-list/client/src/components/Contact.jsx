import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import EditContact from "./EditContact";

        
        
//to create template for individual contacts being listed in the contactslist
function Contact({ onClickHandleDetailsVisible, contact, onDelete, onUpdate}) {
   if (!contact) {
    return <div>Loading...</div>;
   }

   const [editContactVisible, setEditContactVisible] = useState(false);

   const handleContactVisible = () => {
    setEditContactVisible(true);
    console.log('is contact visible?', editContactVisible);
   };


console.log("contact info", contact);
    return (
        <div className="contactCard">
            <h4>Card</h4>
            <div>
            <Card title={contact.name} subTitle="Contact Information">
                <div className="contact-info">
                    <p>
                    {contact.email}
                    </p>
                    <p>
                    {contact.phone}
                    </p>
                    <p>
                    {contact.notes}
                    </p>
                </div>
                {/* <Button label="More Details" onClick={onClickHandleDetailsVisible}/> */}
                <Button label="More Details" onClick={() => onClickHandleDetailsVisible(contact.contact_id)} />
                {editContactVisible && 
                    <EditContact contact={contact} onUpdate={onUpdate} setEditContactVisible={setEditContactVisible}/>}
                <Button label="Edit" onClick={handleContactVisible}/>
                <Button label="Delete" onClick={onDelete}/>
            </Card>
            </div>
        </div>
    )
}

export default Contact;