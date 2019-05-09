import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import isEmpty from 'lodash/isEmpty';
import {orderApi} from 'apis';

import OrderTable from './OrderTable';

class OrderListScreen extends Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const orders = await orderApi.getOrders();

    this.setState({
      orders,
    });
  }


  render() {
    const {orders} = this.state;

    return <div>
      <Typography component="h4" variant="h2" gutterBottom>Afhaallijst</Typography>
      {
        !isEmpty(orders) ? <OrderTable onCollectOrders={this.handleCollectOrders} orders={orders}/> :
        <span>geen orders</span>
      }
      
    </div>;
  }

  handleCollectOrders = async (orderIds) => {
    await orderApi.finishOrders(orderIds);
    this.loadData();
  }
}

export default OrderListScreen;
