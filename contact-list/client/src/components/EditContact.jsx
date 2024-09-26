import { Button } from "primereact/button";
import { useState } from "react";

function EditContact({ contact, onUpdate, setEditContactVisible }) {

    const [updatedContact, setUpdatedContact] = useState({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        notes: contact.notes
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedContact({...updatedContact, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(contact.contact_id, updatedContact);
        setEditContactVisible(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={updatedContact.name}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={updatedContact.email}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    type="text"
                    name="phone"
                    value={updatedContact.phone}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Notes:</label>
                <input
                    type="text"
                    name="notes"
                    value={updatedContact.notes}
                    onChange={handleInputChange}
                />
            </div>
            <Button label="submit"></Button> 
        </form>
    )
}

export default EditContact;