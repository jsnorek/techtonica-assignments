import React, { useEffect } from "react";
import Contact from "./contact";
import axios from "axios";

//visual list of all contacts
function ContactsList({ contacts, onClickHandleDetailsVisible, setContacts }) {
    
    const onDelete = (contactId) => {
        axios.delete(`http://localhost:8005/contacts/${contactId}`)
        .then((response) => {
            if (response.status === 200) {
                // Remove the deleted contact from the state
                setContacts((prevContacts) =>
                    prevContacts.filter((contact) => contact.contact_id !== contactId) //filter checks the previous array of contacts and filters out the contact matching the id of the "deleted" contact, therefore returning a new array without that contact
                );
            }
        })
        .catch((error) => {
            console.error("Error deleting contact:", error);
        });
    };


    return (
        <div className="contactsList">
            <h2>Contacts</h2>
            <ul>
                {contacts.map((contact) => {
                    return (
                        <li key={contact.contact_id}>
                            {" "}
                            <Contact
                            contact={contact}
                            onClickHandleDetailsVisible={onClickHandleDetailsVisible}
                            toDelete={() => onDelete(contact.contact_id)}  // Pass the contact_id to onDelete
                            // toUpdate={onUpdate}
                            />
                    </li>
                  );
                })}
            </ul>
        </div>
    )
}

export default ContactsList;