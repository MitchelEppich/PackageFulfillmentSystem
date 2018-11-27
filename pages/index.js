/*******************************************/
/*Main page, Renders all home videos*/
/******************************************/

import React, { Component } from "react";
import withData from "../lib/withData";
import { connect } from "react-redux";
import actions from "../store/actions";
import Layout from "../HOC/Layout";
import Login from "../components/Login"
import Main from "../components/Main"
import Screen from "../components/Main/Screen"

class Index extends Component {
  render() {
    return (
      <Layout>
        <Login />
        <Main 
            showScreen={this.props.showScreen}
            toggleScreen={this.props.toggleScreen} 
            showMoreMultipleFields={this.props.showMoreMultipleFields}
            toggleShowMoreMultipleFields={this.props.toggleShowMoreMultipleFields}
            {...this.props}
        />

        {this.props.showScreen ?
          <Screen 
              showScreen={this.props.showScreen}
              toggleScreen={this.props.toggleScreen} 
              showMoreMultipleFields={this.props.showMoreMultipleFields}
              toggleShowMoreMultipleFields={this.props.toggleShowMoreMultipleFields}
              {...this.props}
          />  
        : null }      
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleScreen: () => dispatch(actions.toggleScreen()),
    toggleShowMoreMultipleFields: () => dispatch(actions.toggleShowMoreMultipleFields())
  };
};

export default connect(
  state => state,
  mapDispatchToProps
)(withData(Index));
