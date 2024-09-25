import { Button } from "primereact/button";
import React, { useState } from "react";

function CreateContact({ addNewContact }) {

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        notes: ""
    });

    const postContacts = async (newContact) => {
        const response = await fetch("http://localhost:8005/contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContact)
        });
        const data = await response.json();
        console.log(data);
        addNewContact(data);
        clearForm();
    };

    const clearForm = () => {
        setContact({
            name: "",
            email: "",
            phone: "",
            notes: ""
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postContacts(contact); //call postContacts to submit form data
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setContact((prevContact) => ({...prevContact, [name]: value}));
    };

    return (
        <div>
            <h2>Add New Contact</h2>
            <form className="createContact" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    value={contact.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email" 
                    value={contact.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    required
                    value={contact.phone}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="notes"
                    placeholder="Notes"
                    value={contact.notes}
                    onChange={handleChange}
                />
                <Button label="submit"></Button>
            </form>
        </div>
    )
}

export default CreateContact;