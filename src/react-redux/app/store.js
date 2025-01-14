import { configureStore } from '@reduxjs/toolkit'
import { productApi } from '../features/products/products';
import { brandApi } from '../features/brand/brand';
import { cartApi } from '../features/cart/cart';
import { orderApi } from '../features/order/order';
import { userApi } from '~/redux/services/userApi';



export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        productApi.middleware,
        brandApi.middleware,
        cartApi.middleware,
        orderApi.middleware,
        userApi.middleware,
      
    ),
});