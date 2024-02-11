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
<div className="max-w-xs mx-auto mb-8">
      <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="aspect-h-4 aspect-w-3 bg-gray-200 group-hover:opacity-75">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-between p-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              <Link to={`/product/${product._id}`}>
                {product.name}
              </Link>
            </h3>
            <p className="text-sm text-gray-500">
              {product.description?.substring(0, 200)}...
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm italic text-gray-500">{product.brand}</p>
            <p className="text-base font-medium text-gray-900">$ {product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
