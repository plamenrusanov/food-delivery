import { Routes, Route } from "react-router-dom";

import { ProductsContext } from "../../contexts/ProductsContext";
import { useProducts } from "../../hooks/useProducts";

import CreateProduct from "../Products/CreateProduct/CreateProduct";
import EditProduct from "../Products/EditProduct/EditProduct";
import Register from "../Authentication/Register/Register";
import Login from "../Authentication/Login/Login";
import Home from "../Menu/Home/Home";
import Logout from "../Authentication/Logout/Logout";
import ShoppingCart from "../ShopCart/ShoppingCart/ShoppingCart";
import MyOrders from "../Orders/MyOrders/MyOrders";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import RouteGuard from "../RouteGuard/RouteGuard";
import AdminGuard from "../AdminGuard/AdminGuard";

import "./Main.css";

export default function Main() {

  return (
    <ProductsContext.Provider value={useProducts()}>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route element={<RouteGuard />}>
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/logout" element={<Logout />} />
            <Route element={<AdminGuard />}>
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/edit-product/:_id" element={<EditProduct />} />
            </Route>
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </ProductsContext.Provider>
  );
}
