import React, { Component } from 'react';
import {connect} from 'react-redux'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
    setupInputConfig(placeholder, rules={required: true}){
        return {
            elementType: 'input',
            elementConfig:{
                type: 'text',
                placeholder: placeholder
            },
            value: '',
            valid: false,
            validation: rules,
            touched: false
        }
    }

    state = {
        orderForm: {
            name: this.setupInputConfig('Your Name'),
            street: this.setupInputConfig('Street Address'),
            code: this.setupInputConfig('ZIP Code', {required: true, minLength: 5, maxLength: 5}),
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
                value: 'fastest',
                valid: true,
                validation: {},
                touched: false
            }
        },
        formIsValid: false
    }

    checkValidity(value, rules){
        let isValid = true

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })

        const formData = {}
        for(let formElementId in this.state.orderForm){
            formData[formElementId]= this.state.orderForm[formElementId].value;
        }
        const order = {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice,//in real app you would re calculate price on server
        orderData: formData
        }

        this.props.onOrderBurger(order)
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm}
        const updatedElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedElement.value = event.target.value
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation)
        updatedElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedElement

        let formIsValid = true;
        for(let formElement in updatedOrderForm){
            formIsValid = updatedOrderForm[formElement].valid && formIsValid
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
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
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
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

const mapStateToProps = state => {
    return {
      ingredients: state.burgerBuilder.ingredients,
      totalPrice: state.burgerBuilder.totalPrice,
      loading: state.order.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));