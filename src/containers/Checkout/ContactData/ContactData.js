import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    setupInputConfig(placeholder){
        return {
            elementType: 'input',
            elementConfig:{
                type: 'text',
                placeholder: placeholder
            },
            value: ''
        }
    }

    state = {
        orderForm: {
            name: this.setupInputConfig('Your Name'),
            street: this.setupInputConfig('Street Address'),
            city: this.setupInputConfig('ZIP Code'),
            country: this.setupInputConfig('Country'),
            email: this.setupInputConfig('Your Email'),
            deliveryMethod: {
                elementType: 'select',
                elementConfig:{
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })

        const orders = {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice,//in real app you would re calculate price on server
        customer: {
            name: 'Vishal Deepak',
            address: {
            street: 'Avenue Road',
            city: 'Gotham'
            },
            email: 'test@test.com'
        },
        deliveryMethod: 'Fastest'
        }

        axios.post('/orders.json', orders)
        .then(response => {
            this.setState({loading: false})
            this.props.history.push('/')
        })
        .catch(error => {
            this.setState({loading: false})
            this.props.history.push('/')
            console.log(error)
        })
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm}
        const updatedElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedElement.value = event.target.value
        updatedOrderForm[inputIdentifier] = updatedElement
        this.setState({
            orderForm: updatedOrderForm
        })
    }

    render () {
        const formElementsArray = []
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;