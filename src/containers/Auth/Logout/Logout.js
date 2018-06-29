import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class Logout extends Component {
  componentDidMount() {
    this.props.store.auth.authLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default Logout;
