import Layout from "../core/layout";
import { useState } from "react";
import { API } from "../config";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signup = (user) => {
    fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    signup({ name, email, password });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("name")}
        ></input>
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="Email"
          className="form-control"
          onChange={handleChange("email")}
        ></input>
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="Password"
          className="form-control"
          onChange={handleChange("password")}
        ></input>
      </div>
      <button onClick={clickSubmit} type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title="Sign up"
      description="Sign up to Node React App"
      className="container col-md-8 offset-md-2"
    >
      {signUpForm()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Signup;
