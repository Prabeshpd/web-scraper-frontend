import * as React from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import LoginForm from './loginForm';

import AppState from 'types/state/AppState';
import { LoginRequest } from '../../types/Login';

import { loginUser } from '../../actions/login';

interface StatePropsInterface {
  isLoggedIn: boolean;
}

interface DispatchPropsInterface {
  loginUser: (payload: LoginRequest) => void;
}

function Login(props: StatePropsInterface & DispatchPropsInterface) {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/signup`;
    navigate(path);
  };
  const { isLoggedIn, loginUser } = props;

  const handleFormSubmit = async (payload: LoginRequest) => {
    try {
      await loginUser(payload);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/beers" replace={true} />;
  }

  return (
    <div className="flex-container align-center">
      <div className="callout m-24" style={{ width: '30%' }}>
        <div className="align-centre">
          <p className="text-center">
            Not Created an account{' '}
            <a className="primary hollow medium" onClick={routeChange}>
              Click here for signup
            </a>
          </p>
        </div>
        <div className="m-2">
          <LoginForm handleFormSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    isLoggedIn: state.data.user.isLoggedIn,
  };
};

const mapDispatchToProps = {
  loginUser,
};

export default connect<StatePropsInterface, DispatchPropsInterface>(mapStateToProps, mapDispatchToProps)(Login);
