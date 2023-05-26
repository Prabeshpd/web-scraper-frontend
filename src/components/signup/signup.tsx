import * as React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import SignupForm from './signupForm';

import { createUser } from '../../actions/user';
import { SignupPayload } from 'types/Signup';

interface DispatchPropsInterface {
  createUser: (payload: SignupPayload) => void;
}

export function SignUp(props: DispatchPropsInterface) {
  let navigate = useNavigate();

  const { createUser } = props;
  const handleFormSubmit = async (payload: SignupPayload) => {
    try {
      await createUser(payload);
      toast.success('User is successfully created. Please log in');
      navigate('/login');
    } catch (err) {
      console.log({ err });
      toast.error('Failed to create user');
    }
  };

  return (
    <div className="flex-container align-center">
      Signup Form
      <div className="callout m-24" style={{ width: '30%' }}>
        <SignupForm handleFormSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  createUser,
};

export default connect<null, DispatchPropsInterface>(null, mapDispatchToProps)(SignUp);
