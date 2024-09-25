import React from "react";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

        
        
//to create template for individual contacts being listed in the contactslist
function Contact({ onClickHandleDetailsVisible, contact, toDelete}) {
   if (!contact) {
    return <div>Loading...</div>;
   }

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
                <Button label="Edit" />
                <Button label="Delete" onClick={toDelete}/>
            </Card>
            </div>
        </div>
    )
}

export default Contact;