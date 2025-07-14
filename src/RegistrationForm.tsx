import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface User {
  firstname: string;
  lastname: string;
  phonenumber: string;
  email: string;
  password: string;
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: User = {
    firstname: '',
    lastname: '',
    phonenumber: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    phonenumber: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const onSubmit = (values: User) => {
    // Get existing users from sessionStorage
    const usersJSON = sessionStorage.getItem('users');
    const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];

    // Check if email already exists
    if (users.find(user => user.email === values.email)) {
      alert('Email is already registered');
      return;
    }

    users.push(values);
    sessionStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    navigate('/login');
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Register</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form>
            <label>First Name</label>
            <Field type="text" name="firstname" />
            <ErrorMessage name="firstname" component="div" className="error" />

            <label>Last Name</label>
            <Field type="text" name="lastname" />
            <ErrorMessage name="lastname" component="div" className="error" />

            <label>Phone Number</label>
            <Field type="text" name="phonenumber" />
            <ErrorMessage name="phonenumber" component="div" className="error" />

            <label>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />

            <label>Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />

            <button type="submit">Register</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
