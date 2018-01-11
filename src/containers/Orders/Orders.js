import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'


class Orders extends Component {
  componentDidMount(){
    // this.setState({loading: true})
    this.props.fetchOrders(this.props.token);
  }

  render () {
    let all_orders = <Spinner />
    if(!this.props.loading){
      all_orders = this.props.orders.map(order => {
        return <Order
          key={order["id"]}
          price={+order["price"]}
          ingredients={order["ingredients"]}/>
      })
    }
    return (
      <div>
        {all_orders}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
  };
}

const mapDispatchToProps = dispatch => {
  return {
      fetchOrders: (token) => dispatch(actions.fetchOrders(token)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));


