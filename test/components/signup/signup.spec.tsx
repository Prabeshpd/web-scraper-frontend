import * as React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { SignUp } from '../../../src/components/signup/signup';

test('Signup:', () => {
  const createUser = jest.fn();

  let signUpComponent = render(
    <BrowserRouter>
      <SignUp createUser={createUser} />
    </BrowserRouter>
  );

  expect(signUpComponent.getByText('Signup Form')).toBeInTheDocument();
});
