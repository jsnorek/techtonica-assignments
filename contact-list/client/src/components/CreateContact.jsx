import { Button } from "primereact/button";
import React from "react";

function CreateContact() {

    return (
        <div>
            <h2>Add New Contact</h2>
            <form>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email" 
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    required
                />
                <input
                    type="text"
                    name="notes"
                    placeholder="Notes"
                />
                <Button label="submit"></Button>
            </form>
        </div>
    )
}

export default CreateContact;