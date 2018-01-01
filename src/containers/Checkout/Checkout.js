import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount(){
      const query = new URLSearchParams(this.props.location.search)
      const ingredients = {}
      for(let params of query.entries()){
        ingredients[params[0]] = +params[1];
      }
      this.setState({
        ingredients: ingredients
      })
    }

    cancelButtonHandler = () => {
      this.props.history.goBack();
    }

    continueButtonHandler = () => {
      this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                  continueHandle={this.continueButtonHandler}
                  cancelHandle={this.cancelButtonHandler}
                  ingredients={this.state.ingredients}/>
            </div>
        );
    }
}

export default Checkout;