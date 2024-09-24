import { useEffect, useState } from 'react'
import './App.css'
import { PrimeReactProvider } from 'primereact/api';
import ContactsList from './components/ContactsList'
import ViewContactDetails from './components/ViewContactDetails'
import Contact from './components/contact';
import { Button } from 'primereact/button';
import CreateContact from './components/CreateContact';


function App({  Component, pageProps}) {

  const [contactDetailsVisible, setContactDetailsVisible] = useState(false);
  const [contacts, setContacts] = useState([]);

  const loadContacts = () => {
    const contacts = [
      { contact_id: 1,
        name: 'juliana',
        email: 'juliana@example.com',
        phone: '7077077077',
        notes: 'additional notes'
      },
      { contact_id: 2,
        name: 'rhino',
        email: 'rhino@example.com',
        phone: '7077077078',
        notes: 'additional notessss'
      }
    ]
    setContacts(contacts);
  }

  useEffect(() => {
    loadContacts();
  }, []); //add contact in the array?
  

  const handleDetailsVisible = () => {
    setContactDetailsVisible(true);
    console.log('contact details?', contactDetailsVisible);
  };
  
  return (
    <PrimeReactProvider>
      <h1>Contact List</h1>
      <ContactsList contacts={contacts} onClickHandleDetailsVisible={handleDetailsVisible}/>
      {contactDetailsVisible && <ViewContactDetails setContactDetailsVisible={setContactDetailsVisible} />}
      {/* <Contact contacts={contacts} onClickHandleDetailsVisible={handleDetailsVisible} contactDetailsVisible={contactDetailsVisible}/> */}
      <CreateContact />
    </PrimeReactProvider>
  )
}

export default App
