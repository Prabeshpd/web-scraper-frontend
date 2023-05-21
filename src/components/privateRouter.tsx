import * as React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import AppState from '../types/state/AppState';

interface StatePropsInterface {
  isLoggedIn: boolean;
}

function PrivateRouteOutlet(props: StatePropsInterface) {
  const { isLoggedIn } = props;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

const mapStateToProps = (state: AppState) => {
  return {
    isLoggedIn: state.data.user.isLoggedIn,
  };
};

export default connect<StatePropsInterface>(mapStateToProps)(PrivateRouteOutlet);
