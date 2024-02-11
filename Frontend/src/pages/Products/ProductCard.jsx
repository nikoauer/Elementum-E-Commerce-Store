import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import FavouritesIcon from "./FavouritesIcon";

const ProductCard = ({product}) => {

    const dispatch = useDispatch()

  return (
<div className="mx-auto mb-5">
      <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white">
      <Link to={`/product/${product._id}`}>
        <div className="aspect-h-4 aspect-w-3 bg-gray-200 group-hover:opacity-75">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between p-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900">
                {product.name}
            </h3>
            <p className="text-sm text-gray-500">
              
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm italic text-gray-500">{product.brand}</p>
            <p className="text-base font-medium text-gray-900">${product.price}</p>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
