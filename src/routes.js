import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/signup";
import Signin from "./user/signin";
import Home from "./core/home";
import PrivateRoute from "./auth/privateroute";
import Dashboard from "./user/userdashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
