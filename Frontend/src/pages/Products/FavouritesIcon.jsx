import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import {
  addtoFavourites,
  removefromFavourites,
  setFavourites,
} from "../../redux/features/favourites/favouritesSlice";
import {
  addFavouritesToLocalStorage,
  getFavouritesFromLocalStorage,
  removeFavouritesFromLocalStorage,
} from "../../utils/localStorage";
import { useEffect } from "react";

const FavouritesIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites) || [];
  const isFavourites = favourites.some((p) => p._id === product._id);

  useEffect(() => {
    const localStorageFavourites = getFavouritesFromLocalStorage();
    dispatch(setFavourites(localStorageFavourites));
  }, []);

  const toggleFavourites = () => {
    if (isFavourites) {
      dispatch(removefromFavourites(product));

      removeFavouritesFromLocalStorage(product._id);
    } else {
      dispatch(addtoFavourites(product));
      addFavouritesToLocalStorage(product);
    }
  };

  return (
    <div onClick={toggleFavourites} className="abolsute cursor-pointer">
      {isFavourites ? (
        <IoHeartSharp className="text-red-600" />
      ) : (
        <IoHeartOutline className="h-6 w-6 text-gray-600" />
      )}
    </div>
  );
};

export default FavouritesIcon;
