import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
  //This is a stateful component for the saking of debugging/Learning
  // componentWillUpdate(){
  //   console.log("Updated")
  // }

  render(){
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {[this.props.ingredients[igKey]]}
        </li>
      )
    })

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>
          Total Price: <strong>{this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Contine To Checkout?</p>
        <Button clicked={this.props.purchaseCancel} btnType="Danger">CANCEL</Button>
        <Button clicked={this.props.purchaseContinue} btnType="Success">CONTINUE</Button>
      </Aux>
    )
    }
}

export default OrderSummary;