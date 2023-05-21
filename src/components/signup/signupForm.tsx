import { Formik } from 'formik';
import * as React from 'react';

import signupSchema from '../../schema/signup';
import { SignupPayload } from '../../types/Signup';

interface InjectedProps {
  handleFormSubmit: (payload: SignupPayload) => void;
}

export function SignUpForm(props: InjectedProps) {
  const { handleFormSubmit } = props;
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={signupSchema}
      onSubmit={async (values) => {
        const payload = {
          name: values.name.trim(),
          email: values.email.trim(),
          password: values.password,
        };

        await handleFormSubmit(payload);
      }}
    >
      {({ handleBlur, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div className="grid-x grid-margin-x mt-5">
            <div className="cell small-12 mt-5">
              <label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && errors.name}
              </label>
            </div>
            <div className="cell small-12">
              <label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && errors.password}
              </label>
            </div>
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
          </div>
          <div className="grid-x grid-margin-x flex-container align-right">
            <button className="button large-3 small m-2 secondary hollow" name="reset" type="reset" value="Reset">
              Cancel
            </button>
            <button
              className="button large-3 small m-2"
              name="submit"
              type="submit"
              disabled={isSubmitting}
              value="Submit"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default SignUpForm;
