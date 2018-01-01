import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Aux';
import BuildControls from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.4,
  cheese: 0.2,
  bacon: 1.8
}

class BurgerBuilder extends Component{
  state = {
    ingredients: null,
    totalPrice: 4.0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount(){
    axios.get("/ingredients.json")
      .then(response => {
        this.setState({ingredients: response.data})
      })
      .catch(error => {
        this.setState({error: true})
      })
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

  purchaseContinueHandler = () => {
    const queryParams=[]
    for (let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push("total_price="+this.state.totalPrice)
    this.props.history.push({
      pathname: "/checkout",
      search: '?' + queryParams.join('&')
    });
  }

  render(){
    const disableIngredients = {...this.state.ingredients};
    for( var key in disableIngredients){
      disableIngredients[key] = disableIngredients[key] <= 0;
    }
    let orderSummary = null
    let burger = this.state.error ? <p>Error Fetching Data!</p> : <Spinner />

    if(this.state.ingredients){
      burger = (
        <Aux>
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
      orderSummary = <OrderSummary
      totalPrice={this.state.totalPrice}
      purchaseCancel={this.purchaseCancelHandler}
      purchaseContinue={this.purchaseContinueHandler}
      ingredients={this.state.ingredients}/>
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

export default withErrorHandler(BurgerBuilder, axios)