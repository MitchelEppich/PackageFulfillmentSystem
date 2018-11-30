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

class Index extends Component {
  componentDidMount() {
    this.props.fetchCredentials().then(res => {
      if (res == null) return;
      this.props.toggleLoginScreen();
    });
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
        {/* {console.log(this.props)} */}
        {/* {this.props.misc.showLoginScreen ? <Login {...this.props} /> : null} */}
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
    setMultiItemBase: input => dispatch(actions.setMutliItemBase(input)),
    setItemValue: input => dispatch(actions.setItemValue(input)),
    verifyItemList: input => dispatch(actions.verifyItemList(input)),
    fetchLogs: input => dispatch(actions.fetchLogs(input)),
    clearItem: () => dispatch(actions.clearItem())
  };
};

export default connect(
  state => state,
  mapDispatchToProps
)(withData(Index));
