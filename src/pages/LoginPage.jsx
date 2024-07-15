
import { useNavigate } from 'react-router-dom';
import loginSchema from './../schemas/LoginSchema';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TOKEN } from './../constants/index';

const LoginPage = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        let res = await axios.post("https://reqres.in/api/login", values);
        localStorage.setItem(TOKEN, res.data.token);
        setIsLogin(true);
        navigate("/");
      } catch (err) {
        toast.error(err.response.data.error);
      }
    },
  });

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center ">
      <form className="container mt-4 w-25" onSubmit={formik.handleSubmit}>

        <div className="form-group mb-3">
          <label className="mb-2" htmlFor="email">Email</label>
          <input id="email" name="email" className="form-control" onChange={formik.handleChange}
            value={formik.values.email} onBlur={formik.handleBlur} />
          {formik.touched.email && formik.errors.email ? (
            <p className='text-danger'>{formik.errors.email}</p>
          ) : null}
        </div>

        <div className="form-group mb-3">
          <label className="mb-2" htmlFor="password">Password</label>
          <input id="password" name="password" className="form-control" onChange={formik.handleChange}
            value={formik.values.password} onBlur={formik.handleBlur} />
          {formik.touched.password && formik.errors.password ? (
            <p className='text-danger'>{formik.errors.password}</p>
          ) : null}
        </div>

        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage