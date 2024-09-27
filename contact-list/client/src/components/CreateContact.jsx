import { Button } from "primereact/button";
import React, { useState, useEffect } from "react";
import * as actions from "../actions/postContacts";

function CreateContact({ addNewContact }) {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }, [errorMessage]);

  const clearForm = () => {
    setContact({
      name: "",
      email: "",
      phone: "",
      notes: "",
    });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contact.name || !contact.phone) {
      setErrorMessage("Name and Phone are required fields.");
      console.log(errorMessage);
      return;
    }

    const data = await actions.postContacts(contact); //call postContacts to submit form data
    addNewContact(data);
    clearForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  return (
    <div className="createContact" data-testid="create-contact">
      <h2>Add New Contact</h2>
      <form className="contactForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          maxLength="25"
          value={contact.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={contact.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          maxLength="12"
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
      {errorMessage && (
        <p className="errorMessage" style={{ color: "red" }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default CreateContact;
