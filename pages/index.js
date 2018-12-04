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
      this.props.setVisibleScreen(null);
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
        this.props.setVisibleScreen(null);
      });
    }
  }

  render() {
    return (
      <Layout>
        {this.props.misc.visibleScreen != null &&
        this.props.misc.visibleScreen.includes("login") ? (
          <Login {...this.props} />
        ) : null}
        <Main {...this.props} />

        {this.props.misc.visibleScreen != null &&
        this.props.misc.visibleScreen.includes("users") ? (
          <Users {...this.props} />
        ) : null}
        {this.props.misc.visibleScreen != null &&
        this.props.misc.visibleScreen.includes("logs") ? (
          <Logs {...this.props} />
        ) : null}
        {this.props.misc.visibleScreen != null &&
        this.props.misc.visibleScreen.includes("register") ? (
          <RegisterUser {...this.props} />
        ) : null}

        {this.props.misc.visibleScreen != null &&
        this.props.misc.visibleScreen.includes("itemized") ? (
          <Screen {...this.props} />
        ) : null}
        <Subscription subscription={subscription.orderUpdate}>
          {({ data }) => {
            if (data != null) {
              let _claimedOrders = this.props.order.claimedOrders;
              let _order = data.orderUpdate;
              _order = { ..._order, ...JSON.parse(_order.content) };

              let _shouldAppend =
                _order.claimed &&
                !_claimedOrders.includes(_order.invoice_number);
              let _shouldRemove =
                !_order.claimed &&
                _claimedOrders.includes(_order.invoice_number);

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
    fetchUsers: input => dispatch(actions.fetchUsers(input)),
    verifyCredentials: input => dispatch(actions.verifyCredentials(input)),
    registerCredentials: input => dispatch(actions.registerCredentials(input)),
    releaseCredentials: input => dispatch(actions.releaseCredentials(input)),
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
    updateOrder: input => dispatch(actions.updateOrder(input)),
    modifyUser: input => dispatch(actions.modifyUser(input)),
    modifyLogs: input => dispatch(actions.modifyLogs(input)),
    setVisibleScreen: input => dispatch(actions.setVisibleScreen(input))
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
