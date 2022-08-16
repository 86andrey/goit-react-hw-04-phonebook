import { useState, useEffect} from 'react';
import useLocalStorage from 'hooks/localStorage';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import styled from 'styled-components';
import shortid from 'shortid';



export default function Phonebook() {
    const [contacts, setContacts] = useLocalStorage('contacts', []);
    const [filter, setFilter] = useState('');

    const addContact = ({ name, number }) => {    
    const isContact = contacts.find(contact => contact.name === name);
    if (isContact) {
      alert(`${name} is already in contact`);
      setContacts(contacts);
    } else {
      setContacts([
        {
        id: shortid.generate(),
        name,
        number,
        },
        ...contacts,])
    };
  };

  const deleteContact = (contactId) => {
      setContacts(contacts => (
        contacts.filter(contact => contact.id !== contactId)
      ));
    }; 

    const onChangeFilter = (e) => {
        setFilter(e.currentTarget.value);
    };

    const getVisibleContact = () => {
        const normalizedFilter = filter.toLowerCase();
      return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter));     
  };
  
 useEffect(() => {
    // в классах это componentDidMount
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
   }, [setContacts]);
  
  useEffect(() => {
    // в классах это componentDidUpdate
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <SectionPhonebook>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={onChangeFilter} />
      <ContactList contacts={getVisibleContact()} onDeleteContact={deleteContact} />
    </SectionPhonebook>);        
 
};

const SectionPhonebook = styled.div`
    width: 400px;
    margin: auto;
    padding: 20px;
    flex-direction: column;
    border: 2px solid darkred;
    border-radius: 10px;
    background-color: rgb(250,240,230);`;


