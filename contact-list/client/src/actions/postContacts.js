export const postContacts = async (newContact) => {
  const response = await fetch("http://localhost:8005/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newContact),
  });
  if (!response.ok) {
    throw new Error("Failed to submit form. Please try again.");
  }

  const data = await response.json();
  return data;
};
