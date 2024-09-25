import { useEffect, useState } from 'react'
import './App.css'
import { PrimeReactProvider } from 'primereact/api';
import ContactsList from './components/ContactsList'
import ViewContactDetails from './components/ViewContactDetails'
import Contact from './components/contact';
import { Button } from 'primereact/button';
import CreateContact from './components/CreateContact';
import axios from 'axios';


function App({  Component, pageProps}) {

  const [contactDetailsVisible, setContactDetailsVisible] = useState(false);
  const [contactDetails, setContactDetails] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState(null);

  //fetch all contacts to be displayed
  useEffect(() => {
      axios.get('http://localhost:8005/contacts')
      .then(response => setContacts(response.data))
      .catch(error => console.error(error));
  }, []);

  // console.log('contacts list', contacts);

  //fetch contact details based on selectedContactId
  // useEffect(() => {
  //   if (selectedContactId) {
  //     console.log('Fetching details for contact id:', selectedContactId);  // Check the ID being used
  //   axios.get(`http://localhost:8005/contacts/contact_details/${selectedContactId}`)
  //   .then(response => {console.log('Contact details fetched:', response.data);  // Check the response
  //     setContactDetails(response.data)
  //   })
  //   .catch(error => console.error(error));
  //   }
  // }, [selectedContactId]);

  // Fetch contact details based on selectedContactId (async/await version)
  useEffect(() => {
    const fetchContactDetails = async () => {
      if (selectedContactId) {
        console.log('Fetching details for contact id:', selectedContactId);  // Check the ID being used
        
        try {
          const response = await axios.get(`http://localhost:8005/contacts/contact_details/${selectedContactId}`);
          console.log('Contact details fetched:', response.data);  // Check the response
          setContactDetails(response.data);  
        } catch (error) {
          console.error('Error fetching contact details:', error);
        }
      }
    };

    fetchContactDetails();  
  }, [selectedContactId]);

  console.log('the selected contact details contact ID', selectedContactId);

  //test data
  // const loadContacts = () => {
  //   const contacts = [
  //     { contact_id: 1,
  //       name: 'juliana',
  //       email: 'juliana@example.com',
  //       phone: '7077077077',
  //       notes: 'additional notes'
  //     },
  //     { contact_id: 2,
  //       name: 'rhino',
  //       email: 'rhino@example.com',
  //       phone: '7077077078',
  //       notes: 'additional notessss'
  //     }
  //   ]
  //   setContacts(contacts);
  // }

  // useEffect(() => {
  //   loadContacts();
  // }, []); //add contact in the array?
  
  //when 'more details' button is clicked
  const handleDetailsVisible = (contactId) => {
    setSelectedContactId(contactId);
    setContactDetailsVisible(true);
    console.log('contact details?', contactId);
  };
  
  return (
    <PrimeReactProvider>
      <h1>Contact List</h1>
      <ContactsList contacts={contacts} onClickHandleDetailsVisible={handleDetailsVisible}/>
      {contactDetailsVisible && 
        <ViewContactDetails contactDetails={contactDetails} setContactDetailsVisible={setContactDetailsVisible} />}
      {/* <Contact contacts={contacts} onClickHandleDetailsVisible={handleDetailsVisible} contactDetailsVisible={contactDetailsVisible}/> */}
      <CreateContact />
    </PrimeReactProvider>
  )
}

export default App
