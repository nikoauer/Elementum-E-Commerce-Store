import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query/react';
import {apiSlice} from '../api/apiSlice';
import authReducer from './auth/authSlice';
import favouritesReducer from "../features/favourites/favouritesSlice"
import { getFavouritesFromLocalStorage } from '../../utils/localStorage';
import cartSliceReducer from './cart/cartSlice';
import shopReducer from '../features/shop/shopSlice'


const currentFavourites = getFavouritesFromLocalStorage () || []

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favourites: favouritesReducer,
        cart: cartSliceReducer,
        shop: shopReducer,
    },

    preloadedState: {
        favourites: currentFavourites
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
        devTools: true,
});

setupListeners(store.dispatch);
export default store;
