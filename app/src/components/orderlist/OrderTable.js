import React, { Component } from 'react';
import PropTypes from 'prop-types';
import set from 'lodash/set';
import {Button} from '@material-ui/core';

class OrderTable extends Component {
  static propTypes = {
    orders: PropTypes.array.isRequired,
    onCollectOrders: PropTypes.func.isRequired,
  }
  state = {
    checked: {},
  }

  render() {
    return <div>
      <table>
        <thead>
          <tr>
            <td>Product</td>
            <td>Sterkte</td>
            <td>Melk</td>
            <td>Suiker</td>
            <td>Code</td>
            <td>Besteller</td>
            <td>Gehaald</td>
          </tr>
        </thead>
        <tbody>
          {this.renderOrders()}
        </tbody>
      </table>
      <Button color="primary" variant="contained" onClick={this.handleAfhalenClick}>Afhalen</Button>
    </div>
  }

  renderOrders() {
    return this.props.orders.map(order => this.renderOrder(order));
  }

  renderOrder(order) {
    const {drink, strength, milk, sugar, username, code} = order;

    return <tr>
      <td>{drink}</td>
      <td>{strength}</td>
      <td>{milk}</td>
      <td>{sugar}</td>
      <td>{code}</td>
      <td>{username}</td>
      <td><input type="checkbox" checked={this.isChecked(order)} onClick={() => this.handleCheck(order)}></input></td>
    </tr>;
  }

  isChecked(order) {
    return !!this.state.checked[order._id];
  }

  handleCheck = (order) => {
    const {checked} = this.state;
    this.setState({
      checked: set(checked, order._id, !checked[order._id]),
    });
  }

  handleAfhalenClick = () => {
    const {checked} = this.state;
    this.props.onCollectOrders(Object.keys(checked).filter(orderId => checked[orderId]));
  };
}

export default OrderTable;
