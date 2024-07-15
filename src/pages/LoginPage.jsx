
const LoginPage = () => {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center ">
      <form className="container mt-4 w-25">

        <div className="form-group mb-3">
          <label className="mb-2" htmlFor="email">Email</label>
          <input id="email" name="email" className="form-control" />
        </div>

        <div className="form-group mb-3">
          <label className="mb-2" htmlFor="password">Password</label>
          <input id="password" name="password" className="form-control" />
        </div>

        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary w-100">
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage