import * as React from 'react';
import { render, waitFor, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SignUpForm } from '../../../src/components/signup/signupForm';

describe('singup Form:', () => {
  const handleFormSubmit = jest.fn();
  let signUpComponent: RenderResult;

  beforeEach(() => {
    signUpComponent = render(<SignUpForm handleFormSubmit={handleFormSubmit} />);
  });

  test('SignupForm to be rendered with needed element', () => {
    const inputNameElement = signUpComponent.getByPlaceholderText('Name');
    expect(inputNameElement).toHaveAttribute('type', 'text');
    expect(inputNameElement).toHaveValue('');

    const inputEmailElement = signUpComponent.getByPlaceholderText('email');
    expect(inputEmailElement).toHaveAttribute('type', 'email');
    expect(inputEmailElement).toHaveValue('');

    const inputPasswordElement = signUpComponent.getByPlaceholderText('password');
    expect(inputPasswordElement).toHaveAttribute('type', 'password');
    expect(inputPasswordElement).toHaveValue('');

    const submitButtonElement = signUpComponent.getByRole('button', { name: 'Save' });
    expect(submitButtonElement).toHaveAttribute('type', 'submit');

    const resetButtonElement = signUpComponent.getByRole('button', { name: 'Cancel' });
    expect(resetButtonElement).toHaveAttribute('type', 'reset');
  });

  test('SignupForm submits value of form on submit', async () => {
    const user = userEvent.setup();

    await user.type(signUpComponent.getByPlaceholderText('Name'), 'John');
    await user.type(signUpComponent.getByPlaceholderText('email'), 'john.dee@gmail.com');
    await user.type(signUpComponent.getByPlaceholderText('password'), 'Admin@123');

    await user.click(signUpComponent.getByRole('button', { name: /save/i }));

    await waitFor(() =>
      expect(handleFormSubmit).toHaveBeenCalledWith({
        email: 'john.dee@gmail.com',
        name: 'John',
        password: 'Admin@123',
      })
    );
  });
});
