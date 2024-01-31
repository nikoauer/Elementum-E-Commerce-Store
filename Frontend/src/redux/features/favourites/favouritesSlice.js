import { createSlice } from "@reduxjs/toolkit";


const favouriteSlice = createSlice({
    name: 'favourites',
    initialState: [],
    reducers: {
        addtoFavourites: (state, action) => {
            if(!state.some((product) => product._id === action.payload._id)) {
                state.push(action.payload)
            }
        },
        removefromFavourites: (state, action) => {
            return state.filter((product) => product._id !== action.payload._id)
        },
        setFavourites: (state, action) => {
            return action.payload
        }
    }
})

export const {addtoFavourites, removefromFavourites, setFavourites} = favouriteSlice.actions

export const selectFavouriteProduct = (state) => state.favourites

export default favouriteSlice.reducer