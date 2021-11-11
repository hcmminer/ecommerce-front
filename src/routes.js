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
import Orders from "./admin/orders";
import Profile from "./user/Profile";
// 3, tiep theo khi click vao link do thi render ra cai j ?
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/updateproduct";

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
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        // khi nhap dung link thi van can them quyen truy cap vao link do (kiem
        tra quyen co trong localStorage cua trinh duyet)
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
