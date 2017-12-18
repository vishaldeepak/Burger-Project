import React from 'react'
import classes from './Ingredient.css'

const ingredient = (props) => {
  let ingredientClass = null;
  let ingredientContainer = null;
  switch (props.key) {
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
      <div>
        <div className={ingredientClass}></div>
      </div>
    )
  }
  return ingredientContainer;
}

export default ingredient

