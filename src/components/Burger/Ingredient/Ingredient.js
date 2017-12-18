import React, {Component} from 'react'
import classes from './Ingredient.css'
import PropTypes from 'prop-types'

class Ingredient extends Component {
  render() {
    let ingredientClass = null;
    let ingredientContainer = null;
    switch (this.props.type) {
      case ('bread-top'):
        ingredientClass = classes.BreadTop;
        break;
      case ('bread-bottom'):
        ingredientClass = classes.BreadBottom;
        break;
      case ('seeds1'):
        ingredientClass = classes.Seeds1;
        break;
      case ('seeds2'):
        ingredientClass = classes.Seeds2;
        break;
      case ('meat'):
        ingredientClass = classes.Meat;
        break;
      case ('cheese'):
        ingredientClass = classes.Cheese;
        break;
      case ('salad'):
        ingredientClass = classes.Salad;
        break;
      case ('bacon'):
        ingredientClass = classes.Bacon;
        break;
      default:
        ingredientClass = null
        break;
    }

    if(ingredientClass === classes.BreadTop)  {
      ingredientContainer = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      )
    } else {
      ingredientContainer = (
        <div className={ingredientClass}>
          <div></div>
        </div>
      )
    }
    return ingredientContainer;
  }
}

Ingredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default Ingredient;

