import React, { Component } from 'react';
import {connect} from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     total_price: 0
    // }
    //Not necessary after adding redux
    // componentWillMount(){
    //   const query = new URLSearchParams(this.props.location.search)
    //   const ingredients = {}
    //   let total_price = null
    //   for(let params of query.entries()){
    //     if(params[0]==='total_price'){
    //       total_price = params[1]
    //     }else{
    //       ingredients[params[0]] = +params[1];
    //     }
    //   }
    //   this.setState({
    //     ingredients: ingredients,
    //     total_price: total_price
    //   })
    // }

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
                  ingredients={this.props.ingredients}/>
                <Route
                  path={this.props.match.path + '/contact-data'}
                  render={(props) => (<ContactData
                      {...props}
                      />)}
                  />
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
}

export default connect(mapStateToProps)(Checkout);