import { Formik } from 'formik';
import * as React from 'react';

import loginSchema from '../../schema/login';
import { LoginRequest } from '../../types/Login';

interface InjectedProps {
  handleFormSubmit: (payload: LoginRequest) => void;
}

function LoginForm(props: InjectedProps) {
  const { handleFormSubmit } = props;
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={async (values) => {
        const payload = {
          email: values.email.trim(),
          password: values.password,
        };

        await handleFormSubmit(payload);
      }}
    >
      {({ handleBlur, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div className="grid-x grid-margin-x mt-5">
            <div className="cell small-12">
              <label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && errors.email}
              </label>
            </div>
            <div className="cell small-12">
              <label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && errors.password}
              </label>
            </div>
          </div>
          <div className="grid-x grid-margin-x flex-container align-right">
            <button className="button large-3 small m-2 secondary hollow" type="reset" value="Reset">
              Cancel
            </button>
            <button className="button large-3 small m-2" type="submit" disabled={isSubmitting} value="Submit">
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
