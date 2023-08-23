import { createContext, useContext, useState } from "react";
import api from "../api/contacts";
import { v4 as uuidv4 } from 'uuid';

const ContactsCrudContext = createContext();

export function ContactsCrudContextProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState([]);
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //RetrieveContacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    if (response.data) {
      setContacts(response.data);
    }
  };

  const addContactHandler = async (contact) => {
    
    const request = {
      id: uuidv4(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const searchHandler = (searchTerm) => {
    setText(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        console.log(contact);
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  const value = {
    contact,
    contacts,
    retrieveContacts,
    addContactHandler,
    removeContactHandler,
    updateContactHandler,
    searchHandler,
    text,
    searchResults
  }

  return (
    <ContactsCrudContext.Provider value={value}>
      {children}
    </ContactsCrudContext.Provider>
  )
}

export function useContactsCrud() {
  return useContext(ContactsCrudContext)
}