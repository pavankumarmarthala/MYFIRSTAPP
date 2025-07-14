import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface LoginValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: LoginValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values: LoginValues) => {
    const usersJSON = sessionStorage.getItem('users');
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    const user = users.find(
      (u: any) => u.email === values.email && u.password === values.password
    );

    if (user) {
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate('/home');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="page-container">
        <div className="form-container">
        <h2>Login</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
            <label>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />

            <label>Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />

            <button type="submit">Login</button>
            </Form>
        </Formik>
        </div>
    </div>
  );
};

export default LoginPage;
