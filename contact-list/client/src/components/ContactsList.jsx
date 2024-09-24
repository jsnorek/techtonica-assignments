import React from "react";
import Contact from "./contact";

//visual list of all contacts
function ContactsList({ contacts, onClickHandleDetailsVisible }) {
   

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
                            // toDelete={onDelete}
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