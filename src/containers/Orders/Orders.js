import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
  state = {
    loading: false,
    orders: []
  }

  componentDidMount(){
    this.setState({loading: true})

    axios.get("orders.json")
      .then(res => {
        const fetchedOrders = []
        for(let key in res.data){
          fetchedOrders.push({
            ...res.data[key],
            id: key
          })
        }
        console.log(fetchedOrders)
        this.setState({loading: false, orders: fetchedOrders})
      })
      .catch(res => {
        this.setState({loading: false})
      })
  }

  render () {
    let all_orders = null

    all_orders = this.state.orders.map(order => {
      return <Order
        key={order["id"]}
        price={+order["price"]}
        ingredients={order["ingredients"]}/>
    })

    return (
      <div>
        {all_orders}
      </div>
    )
  }
}
export default withErrorHandler(Orders, axios);