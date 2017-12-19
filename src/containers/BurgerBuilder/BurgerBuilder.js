import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Aux';
import BuildControls from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.4,
  cheese: 0.2,
  bacon: 1.8
}

class BurgerBuilder extends Component{
  state = {
    ingredients: {
      meat: 0,
      cheese: 0,
      bacon: 0,
      salad: 0
    },
    totalPrice: 0.0,
    purchasable: false,
    purchasing: false
  }

  addIngredientHandler = (type) => {
      const updatedIngredients = {...this.state.ingredients};
      updatedIngredients[type] = this.state.ingredients[type] + 1;
      const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice
      })
      this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    if(this.state.ingredients[type] <= 0){
      return;
    }
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = this.state.ingredients[type] - 1;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    })
    this.updatePurchaseState(updatedIngredients);
  }

  updatePurchaseState = (updatedIngredients) => {
    const totalIngredients = Object.values(updatedIngredients).reduce((a, b) => a + b, 0)
    this.setState({
      purchasable: totalIngredients > 0
    })
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false})
  }

  render(){
    const disableIngredients = {...this.state.ingredients};
    for( var key in disableIngredients){
      disableIngredients[key] = disableIngredients[key] <= 0;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients}/>
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disableIngredients={disableIngredients}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          orderNowHandler={this.purchaseHandler}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder