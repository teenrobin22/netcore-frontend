import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Navigation from './../components/Navigation/Navigation';
import Routes from './Routes';
import * as actions from '../store/actions/actionsIndex';
import { withRouter } from 'react-router-dom';

const Layout = ({
  isAuthenticated,
  decodedToken,
  onLogout,
  history,
  currentUser
}) => {
  const logoutHandler = () => {
    onLogout();
    history.push('/');
  };

  return (
    <Fragment>
      <Navigation
        isAuthenticated={isAuthenticated}
        decodedToken={decodedToken}
        logout={logoutHandler}
        currentUser={currentUser}
      />
      <main className='container'>
        <Routes isAuthenticated={isAuthenticated} />
      </main>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    decodedToken: state.auth.decodedToken,
    currentUser: state.auth.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Layout)
);
