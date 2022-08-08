import React, { Component } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import styled from 'styled-components';
import shortid from 'shortid';


class Phonebook extends Component {
    state = {
        contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
        ],  
        filter: ''
    };

    generateIdContact = shortid.generate();

    addContact = ({ name, number }) => {
    this.setState(({ contacts }) => {
      const isContact = contacts.find(contact => contact.name === name);

      if (isContact) {
        alert(`${name} is already in contact`);
        return contacts;
      } else {
        const newContact = {
        id: this.generateIdContact,
        name,
        number,
      };
        return {
          contacts: [newContact, ...contacts],
        };
      }
    });
  };

    deleteContact = (contactId) => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== contactId),
        }))
    }; 

    onChangeFilter = (e) => {
        this.setState({ filter: e.currentTarget.value });
    };

    getVisibleContact = () => {
        const { contacts, filter } = this.state;
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter));
    };

  componentDidMount() {
    // вызывается один раз при монтировании компонента
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
       this.setState({contacts: parsedContacts})
    }
   }
  
  componentDidUpdate(prevProps, prevState) {
    // Вызывается после каждого обновления
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  
    render() {
        const { filter } = this.state;
        const visibleContacts = this.getVisibleContact();

        return (
            <SectionPhonebook>
                <h1>Phonebook</h1>
                <ContactForm onSubmit={ this.addContact} />
                <h2>Contacts</h2>
                <Filter value={filter} onChange={this.onChangeFilter } />
                <ContactList contacts={visibleContacts} onDeleteContact={this.deleteContact} />        
            </SectionPhonebook>)        
    };
};

const SectionPhonebook = styled.div`
    width: 400px;
    margin: auto;
    padding: 20px;
    flex-direction: column;
    border: 2px solid darkred;
    border-radius: 10px;
    background-color: rgb(250,240,230);`;


export default Phonebook;