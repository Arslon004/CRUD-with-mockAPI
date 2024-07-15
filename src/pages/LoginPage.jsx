
const LoginPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center ">
      <form className="container mt-4 w-25">
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" className="form-control" />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" name="age" className="form-control" />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" className="form-control" />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" className="form-control" />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="date">Created at</label>
          <input type="date" id="date" name="date" className="form-control" />
        </div>

        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage