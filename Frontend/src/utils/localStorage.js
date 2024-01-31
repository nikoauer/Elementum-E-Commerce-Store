export const addFavouritesToLocalStorage = (product) => {
    const favourites = getFavouritesFromLocalStorage()
    if(!favourites.some((p) => p._id === product._d)) {
        favourites.push(product)
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }
}

export const getFavouritesFromLocalStorage = () => {
    const favouritesJSON = localStorage.getItem('favourites')
    return favouritesJSON ? JSON.parse(favouritesJSON) : []
}

export const removeFavouritesFromLocalStorage = (productId) => {
    const favourites = getFavouritesFromLocalStorage()
    const updateFavourites = favourites.filter(
        (product) => product._id !== productId
    )
    localStorage.setItem("favourites", JSON.stringify(updateFavourites));
}