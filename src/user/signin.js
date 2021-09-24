import Layout from "../core/layout";
import { useState } from "react";
import { signin, authenticate, isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
const Signin = () => {
  const [values, setValues] = useState({
    email: "ban@gmail.com",
    password: "aaaa1111",
    error: "",
    loading: false,
    redirectToReferer: false,
  });

  const { email, password, loading, error, redirectToReferer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferer: true,
          });
        });
      }
    });
  };

  const signInForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="Email"
          className="form-control"
          onChange={handleChange("email")}
          value={email}
        ></input>
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="Password"
          className="form-control"
          onChange={handleChange("password")}
          value={password}
        ></input>
      </div>
      <div className="mt-2">
        <button onClick={clickSubmit} type="submit" className="btn btn-primary">
          Sign in
        </button>
      </div>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () => {
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );
  };

  const redirectUser = () => {
    if (redirectToReferer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
  };

  return (
    <Layout
      title="Sign in"
      description="Sign in to Node React App"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signInForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
