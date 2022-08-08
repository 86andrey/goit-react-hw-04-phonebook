import React, { Component } from 'react';
import styled from 'styled-components';

class ContactForm extends Component{
    state = {
        name: '',
        number: ''
    };

    onInputChange = e => {
        const { name, value } = e.currentTarget;
            this.setState({[name] : value})
    };

    onSubmitForm = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.reset()
    };

    reset = () => {
        this.setState({name: '',
        number: ''})
    };

    render() {
        return (<Form onSubmit={this.onSubmitForm}>
                    <Label>Name
                    <Input
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        value={this.state.name}
                        onChange={this.onInputChange}
                        />
                    </Label>
                    <Label>Number
                    <Input
                         type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                            value={this.state.number}
                            onChange={this.onInputChange}
                        />
                        </Label>                    
                    <Btn type="submit">Add contact</Btn>
                </Form>);
    }
};

const Form = styled.form`
    border: 3px solid darkred;
    border-radius: 10px;
    padding: 15px;
    `;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    font-size: 20px;`;

const Input = styled.input`
    border-radius: 5px;
    height: 30px;
    margin-bottom: 10px;
    margin-top: 5px;
    width: 250px;`;

const Btn = styled.button`
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    font-weight: 400;
    padding: 12px 12px;
    :hover, :focus {
  color: white;
  background-color: greenyellow;
}`;

export default ContactForm;

