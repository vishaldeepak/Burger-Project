import React from 'react'
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
  let auth_link = <NavigationItem link="/auth"> Authenticate</NavigationItem>
  let orders_link = null
  if(props.isAuthenticated){
    auth_link = <NavigationItem link="/logout">Logout</NavigationItem>
    orders_link = <NavigationItem link="/orders"> Orders</NavigationItem>
  }
  return (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact> Burger Builder</NavigationItem>
    {orders_link}
    {auth_link}
  </ul>
  )
}

export default navigationItems