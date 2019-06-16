import React, { Component } from 'react';
import PropTypes from 'prop-types';
import set from 'lodash/set';

import {
  Paper,                                                                // Backgrounds
  Table, TableBody, TableCell, TableHead, TableRow,                     // Tables
} from '@material-ui/core'

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
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Sterkte</TableCell>
              <TableCell>Melk</TableCell>
              <TableCell>Suiker</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Besteller</TableCell>
              <TableCell>Gehaald</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.renderOrders()}
          </TableBody>
        </Table>
      </Paper>
    </div>
  }

  renderOrders() {
    return this.props.orders.map(order => this.renderOrder(order));
  }

  renderOrder(order) {
    const {drink, strength, milk, sugar, username, code} = order;

    return <TableRow>
      <TableCell>{drink}</TableCell>
      <TableCell>{strength}</TableCell>
      <TableCell>{milk}</TableCell>
      <TableCell>{sugar}</TableCell>
      <TableCell>{code}</TableCell>
      <TableCell>{username}</TableCell>
      <TableCell><input type="checkbox" checked={this.isChecked(order)} onClick={() => this.handleCheck(order)}></input></TableCell>
    </TableRow>;
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
