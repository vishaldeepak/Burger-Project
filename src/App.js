import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <BurgerBuilder></BurgerBuilder>
          <Checkout/>
        </Layout>
      </div>
    );
  }
}

export default App;
