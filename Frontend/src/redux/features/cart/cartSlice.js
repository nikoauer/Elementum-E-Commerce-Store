import {createSlice} from '@reduxjs/toolkit'

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem("cart")) : {cartItems: [], shippingAddress: {}, paymetMethod: "Paypal"}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const {user, rating, numReviews, reviews, ...item} = action.payload
            const existItem = state.cartItems.find((itemX) => itemX._id === item._id)


            if (existItem) {
                state.cartItems = state.cartItems.map((itemX) => itemX._id === existItem._id ? item : itemX)
            } else {
                state.cartItems = [...state.cartItems, item];
            }
        }
    }
})