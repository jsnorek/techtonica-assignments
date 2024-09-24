import { useState } from 'react'
import './App.css'
import { PrimeReactProvider } from 'primereact/api';
import ContactsList from './components/ContactsList'
import ViewContactDetails from './components/ViewContactDetails'
import Contact from './components/contact';


function App({  Component, pageProps}) {


  return (
    <PrimeReactProvider>
      <h1>Contact List</h1>
      <ContactsList />
      <ViewContactDetails />
      <Contact />
    </PrimeReactProvider>
  )
}

export default App
