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
    <div>
        <div className="relative top-6 left-2">
            <FavouritesIcon product={product}/>
        </div>
        <Link to={`/product/${product._id}`}>
            <div className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-scale-down object-center rounded-md border border-gray-200 bg-white"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700 font-semibold">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    
                  </h3>
                  <p className="mt-1 italic text-sm text-gray-500">{product.brand}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
              </div>
            </div>
            </Link>
    </div>
  );
};

export default ProductCard;
