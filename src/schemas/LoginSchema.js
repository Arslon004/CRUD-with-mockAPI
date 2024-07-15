import * as yup from 'yup';

let loginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long').max(12, 'Password must not be more than 12 characters long')
});

export default loginSchema;