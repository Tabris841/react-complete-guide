import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

@inject('store')
@observer
class Orders extends Component {
  componentDidMount() {
    this.props.store.order.fetchOrders(
      this.props.store.auth.token,
      this.props.store.auth.userId
    );
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.store.order.loading) {
      orders = this.props.store.order.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
