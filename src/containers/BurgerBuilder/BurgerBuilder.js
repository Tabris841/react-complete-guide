import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

@inject('store')
@observer
class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.store.burgerBuilder.initIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.store.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.store.auth.setAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.store.order.purchaseInit();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.store.burgerBuilder.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.store.burgerBuilder.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.store.burgerBuilder.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.store.burgerBuilder.ingredients} />
          <BuildControls
            ingredientAdded={this.props.store.burgerBuilder.addIngredient}
            ingredientRemoved={this.props.store.burgerBuilder.removeIngredient}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(
              this.props.store.burgerBuilder.ingredients
            )}
            ordered={this.purchaseHandler}
            isAuth={this.props.store.auth.isAuthenticated}
            price={this.props.store.burgerBuilder.totalPrice}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.store.burgerBuilder.ingredients}
          price={this.props.store.burgerBuilder.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
