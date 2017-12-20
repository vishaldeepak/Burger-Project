import React from 'react';
import classes from './Layout.css'
import Aux from '../../hoc/Aux';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import Toolbar from '../Toolbar/Toolbar'

const layout = (props) => {
  return (
  <Aux>
      <Toolbar/>
      <SideDrawer />
      <main className={classes.Content}>
        {props.children}
      </main>
  </Aux>
  )}

export default layout;