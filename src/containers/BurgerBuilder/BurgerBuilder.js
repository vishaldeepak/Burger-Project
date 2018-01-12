import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Aux';
import BuildControls from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import axios from '../../axios-orders'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component{
  state = {
    // ingredients: null,
    // totalPrice: 4.0,
    // purchasable: false,
    purchasing: false
    // loading: false,
    // error: false
  }

  componentDidMount(){
    this.props.initIngredients();
  }

  updatePurchaseState = (updatedIngredients) => {
    const totalIngredients = Object.values(updatedIngredients).reduce((a, b) => a + b, 0)
    return totalIngredients > 0
  }

  purchaseHandler = () => {
    if(this.props.isAuthenticated){
      this.setState({ purchasing: true})
    }else{
      this.props.setAuthRedirect('/checkout')
      this.props.history.push('/auth')
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.props.purchaseInit()
    this.props.history.push('/checkout');
  }

  render(){
    const disableIngredients = {...this.props.ingredients};
    for( var key in disableIngredients){
      disableIngredients[key] = disableIngredients[key] <= 0;
    }
    let orderSummary = null
    let burger = this.props.error ? <p>Error Fetching Data!</p> : <Spinner />

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
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      )
      orderSummary = <OrderSummary
      totalPrice={this.props.totalPrice}
      purchaseCancel={this.purchaseCancelHandler}
      purchaseContinue={this.purchaseContinueHandler}
      ingredients={this.props.ingredients}/>
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
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
      addIngredients: (name) => dispatch(actions.addIngredient(name)),
      removeIngredients: (name) => dispatch(actions.removeIngredient(name)),
      initIngredients: (name) => dispatch(actions.initIngredients()),
      purchaseInit: () => dispatch(actions.purchaseInit()),
      setAuthRedirect: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))