import React, { Component } from 'react';
import classes from './Layout.css'
import Aux from '../Aux';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../../components/Toolbar/Toolbar'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }

  render(){
    return (
      <Aux>
          <Toolbar toggleDrawer={this.sideDrawerToggleHandler}/>
          <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
          <main className={classes.Content}>
            {this.props.children}
          </main>
      </Aux>
      )
  }
}

export default Layout;