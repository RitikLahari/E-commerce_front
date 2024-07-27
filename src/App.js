import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from './features/auth/components/Login';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetail from './features/product-list/components/Productdetail';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import Pagenotfound from './pages/Notfound.js';
import OrderSuccess from './pages/OrderSuccess.js';
import UserOrders from './features/user/components/UserOrder.js';
import UserOrdersPage from './pages/UserorderPage.js';
import UserProfile from './features/user/components/UserProfile.js';
import { fetchLoggedInUser } from './features/user/UserAPI.js';
import { fetchLoggedInUserAsync } from './features/user/UserSlice.js';
import Logout from './features/auth/components/Logout.js';
import ForgotPasswordPage from './pages/ForgotPasswordPage.js';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin.js';
import AdminHome from './pages/AdminHome.js';
import AdminProductDetailPage from './pages/AdminProductDetailPage.js';
import ProductForm from './features/admin/components/ProductForm.js';
import AdminProductFormPage from './pages/AdminProductFormPage.js';
import AdminOrdersPage from './pages/AdminOrderPage.js';
import StripeCheckout from './pages/StripeCheckout.js';



const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected><Home></Home></Protected>),
  },
  {
    path: "/admin",
    element: (<ProtectedAdmin><AdminHome></AdminHome></ProtectedAdmin>),
  },
  {
    path: "/login",
    element:  <LoginPage/>,
  },
  {
    path: "/signup",
    element:<SignupPage/>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage></CartPage></Protected>,
  },
  {
    path: "/checkout",
    element:<Checkout></Checkout>,
  },
  {
    path: "/product_detail/:id",
    element: <Protected><ProductDetailPage></ProductDetailPage></Protected>,
  },
  {
    path: "/admin/product_detail/:id",
    element: <ProtectedAdmin><AdminProductDetailPage></AdminProductDetailPage></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form",
    element: <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>,
  },
  {
    path: "/admin/order",
    element: <ProtectedAdmin><AdminOrdersPage></AdminOrdersPage></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>,
  },
  {
    path: "/order-sucess/:id",
    element: <OrderSuccess></OrderSuccess>,
  },
  {
    path: "/orders",
    element: <UserOrdersPage></UserOrdersPage>,
  },
  {
    path: "/profile",
    element: <UserProfile></UserProfile>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: '/stripe-checkout/',
    element: (
      <Protected>
        <StripeCheckout></StripeCheckout>
      </Protected>
    ),
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "*",
    element: <Pagenotfound></Pagenotfound>,
  },
]);
function App() {
   const dispatch=useDispatch();
   const user=useSelector(selectLoggedInUser);
   useEffect(()=>{
    if(user)
    {
       dispatch(fetchItemsByUserIdAsync(user.id))
       dispatch(fetchLoggedInUserAsync(user.id))
    }
   },[dispatch,user])
  return (
    <div className='App'>
         <RouterProvider router={router} />
    </div>
  );
}

export default App;
