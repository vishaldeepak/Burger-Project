import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Aux';
import BuildControls from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component{
  state = {
    // ingredients: null,
    // totalPrice: 4.0,
    // purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  // componentDidMount(){
  //   axios.get("/ingredients.json")
  //     .then(response => {
  //       // this.setState({ingredients: response.data})
  //       this.props.setIngredients({ingredients: response.data, totalPrice: 4.0})
  //       this.updatePurchaseState(response.data)
  //     })
  //     .catch(error => {
  //       this.setState({error: true})
  //     })
  // }

  updatePurchaseState = (updatedIngredients) => {
    const totalIngredients = Object.values(updatedIngredients).reduce((a, b) => a + b, 0)
    return totalIngredients > 0
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  render(){
    const disableIngredients = {...this.props.ingredients};
    for( var key in disableIngredients){
      disableIngredients[key] = disableIngredients[key] <= 0;
    }
    let orderSummary = null
    let burger = this.state.error ? <p>Error Fetching Data!</p> : <Spinner />

    if(this.props.ingredients){
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls
            ingredientAdded={this.props.addIngredients}
            ingredientRemoved={this.props.removeIngredients}
            disableIngredients={disableIngredients}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            orderNowHandler={this.purchaseHandler}
          />
        </Aux>
      )
      orderSummary = <OrderSummary
      totalPrice={this.props.totalPrice}
      purchaseCancel={this.purchaseCancelHandler}
      purchaseContinue={this.purchaseContinueHandler}
      ingredients={this.props.ingredients}/>
    }

    if(this.state.loading){
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
}

const mapDispatchToProps = dispatch => {
  return {
      addIngredients: (name) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: name}),
      removeIngredients: (name) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: name})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))