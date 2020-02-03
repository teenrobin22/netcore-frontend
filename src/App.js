import React, { Fragment, Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

import Layout from './hoc/Layout';
import * as actions from './store/actions/actionsIndex';
import auth from './services/authService';

class App extends Component {
  componentDidMount() {
    this.props.onTrySignUp();
  }

  render() {
    return (
      <Fragment>
        <Layout />
      </Fragment>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.token !== null
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    onTrySignUp: () => dispatch(actions.trySignUp())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
