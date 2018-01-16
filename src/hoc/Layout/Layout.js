import React, { Component } from 'react';
import classes from './Layout.css'
import Aux from '../Aux';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../../components/Toolbar/Toolbar'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

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
          <Toolbar
            isAuthenticated={this.props.isAuthenticated}
            toggleDrawer={this.sideDrawerToggleHandler}/>
          <SideDrawer
            isAuthenticated={this.props.isAuthenticated}
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}/>
          <main className={classes.Content}>
            {this.props.children}
          </main>
      </Aux>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: (state.auth.token !== null)
  };
}

export default withRouter(connect(mapStateToProps)(Layout));