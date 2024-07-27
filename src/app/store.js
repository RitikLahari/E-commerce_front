import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from '../features/product-list/ProductListSlice';
import authReducer from "../features/auth/authSlice"
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice'
import userReducer from '../features/user/UserSlice'
export const store = configureStore({
  reducer: {
    product: ProductReducer,
    auth:authReducer,
    cart: cartReducer,
    order:orderReducer,
    user:userReducer
  },
});
