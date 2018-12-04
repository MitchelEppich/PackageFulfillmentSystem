/*******************************************/
/*Main page, Renders all home videos*/
/******************************************/

import React, { Component } from "react";
import withData from "../lib/withData";
import { connect } from "react-redux";
import actions from "../store/actions";
import Layout from "../HOC/Layout";
import Login from "../components/Login";
import Main from "../components/Main";
import Screen from "../components/Main/Screen";
import RegisterUser from "../components/Admin/RegisterUser";
import Logs from "../components/Admin/Logs";
import Users from "../components/Admin/Users";

import { Subscription } from "react-apollo";
import gql from "graphql-tag";

class Index extends Component {
  componentDidMount() {
    this.props.fetchCredentials().then(res => {
      if (res == null) return;
      this.props.toggleLoginScreen();
    });

    for (let company of this.props.misc.companies) {
      this.props.fetchOrderList({
        url: company.url,
        company: company,
        orderCache: this.props.order.orderCache,
        user: null
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.currentUser == null) {
      this.props.fetchCredentials().then(res => {
        if (res == null) return;
        this.props.toggleLoginScreen();
      });
    }
  }

  render() {
    return (
      <Layout>
        {/* <Users 
        {...this.props}
        /> */}
        {console.log(this.props.order.orderCache)}
        {this.props.misc.showLoginScreen ? <Login {...this.props} /> : null}
        <Main
          showScreen={this.props.misc.showScreen}
          toggleScreen={this.props.toggleScreen}
          showMoreMultipleFields={this.props.misc.showMoreMultipleFields}
          toggleShowMoreMultipleFields={this.props.toggleShowMoreMultipleFields}
          showRegisterScreen={this.props.misc.showRegisterScreen}
          toggleRegisterScreen={this.props.toggleRegisterScreen}
          showLogScreen={this.props.misc.showLogScreen}
          toggleShowLog={this.props.toggleShowLog}
          {...this.props}
        />
        {this.props.misc.showLogScreen ? (
          <Logs
            showLogScreen={this.props.misc.showLogScreen}
            toggleShowLog={this.props.toggleShowLog}
            {...this.props}
          />
        ) : null}
        {this.props.misc.showRegisterScreen ? (
          <RegisterUser
            showRegisterScreen={this.props.misc.showRegisterScreen}
            toggleRegisterScreen={this.props.toggleRegisterScreen}
            {...this.props}
          />
        ) : null}

        {this.props.misc.showScreen ? (
          <Screen
            showScreen={this.props.misc.showScreen}
            toggleScreen={this.props.toggleScreen}
            {...this.props}
          />
        ) : null}
        <Subscription subscription={subscription.orderUpdate}>
          {({ data }) => {
            if (data != null) {
              let _claimedOrders = this.props.order.claimedOrders;
              let _order = data.orderUpdate;
              _order = {
                ..._order,
                ...JSON.parse(_order.content)
              };

              let _shouldAppend =
                _order.claimed &&
                !_claimedOrders.includes(_order.invoice_number);
              let _shouldRemove =
                !_order.claimed &&
                _claimedOrders.includes(_order.invoice_number);

              console.log(_order, _claimedOrders, _shouldRemove);

              if (_shouldAppend | _shouldRemove)
                this.props.modifyClaims({
                  order: _order,
                  claimedOrders: _claimedOrders,
                  orderCache: this.props.order.orderCache,
                  append: _shouldAppend
                });
            }
            return <div />;
          }}
        </Subscription>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCredentials: () => dispatch(actions.fetchCredentials()),
    verifyCredentials: input => dispatch(actions.verifyCredentials(input)),
    registerCredentials: input => dispatch(actions.registerCredentials(input)),
    toggleLoginScreen: () => dispatch(actions.toggleLoginScreen()),
    toggleScreen: () => dispatch(actions.toggleScreen()),
    toggleRegisterScreen: () => dispatch(actions.toggleRegisterScreen()),
    toggleShowLog: () => dispatch(actions.toggleShowLog()),
    releaseCredentials: () => dispatch(actions.releaseCredentials()),
    expandItem: input => dispatch(actions.expandItem(input)),
    focusCompany: input => dispatch(actions.focusCompany(input)),
    fetchOrder: input => dispatch(actions.fetchOrder(input)),
    fetchOrderList: input => dispatch(actions.fetchOrderList(input)),
    setMultiItemBase: input => dispatch(actions.setMutliItemBase(input)),
    setItemValue: input => dispatch(actions.setItemValue(input)),
    verifyItemList: input => dispatch(actions.verifyItemList(input)),
    fetchLogs: input => dispatch(actions.fetchLogs(input)),
    clearItem: () => dispatch(actions.clearItem()),
    modifyClaims: input => dispatch(actions.modifyClaims(input)),
    updateOrder: input => dispatch(actions.updateOrder(input))
  };
};

const subscription = {
  orderUpdate: gql`
    subscription($orderId: String) {
      orderUpdate(orderId: $orderId) {
        _id
        content
        lastUpdate
        status
        claimed
        editBy
      }
    }
  `
};

export default connect(
  state => state,
  mapDispatchToProps
)(withData(Index));
