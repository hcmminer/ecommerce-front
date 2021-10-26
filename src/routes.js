import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/signup";
import Signin from "./user/signin";
import Home from "./core/home";
import PrivateRoute from "./auth/privateroute";
import Dashboard from "./user/userdashboard";
import AdminRoute from "./auth/adminroute";
import AdminDashboard from "./user/admindashboard";
import AddCategory from "./admin/addcategory";
import AddProduct from "./admin/addproduct";
import Shop from "./core/shop";
import Product from "./core/product";
import Cart from "./core/cart";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/shop" exact component={Shop}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <Route path="/product/:productId" exact component={Product}></Route>
        <Route path="/cart" exact component={Cart}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
