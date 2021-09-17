import React from "react";
import Layout from "../core/layout";
import { API } from "../config.js";
const Signin = () => {
  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" className="form-control"></input>
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input type="Email" className="form-control"></input>
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input type="Password" className="form-control"></input>
      </div>
    </form>
  );
  return (
    <Layout title="Sign in" description="Sign in to Node React App">
      {signUpForm()}
    </Layout>
  );
};
export default Signin;
