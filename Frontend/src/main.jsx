import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/features/store.js";

//Auth directories
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";

//Private directories
import PrivateRoute from "./components/privateRoutes.jsx";
import Profile from "./pages/User/Profile.jsx";
import AdminRoutes from "./pages/Admin/AdminRoutes.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";

import Home from "./pages/Home.jsx";
import Favourites from "./pages/Products/Favourites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";

import Cart from "./pages/User/Cart.jsx";
import Shop from "./pages/User/Shop.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/" index={true} element={<Home />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* admin routes */}
      <Route path="/admin" element={<AdminRoutes />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="allproductslist" element={<AllProducts />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
