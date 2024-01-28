import React from 'react'
import { Link } from "react-router-dom";
import {HeartIcon} from "@heroicons/react/24/outline";

const Product = ({ product }) => {
  return (
<div key={product._id} className="group relative">
              <div className="h-96 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 sm:h-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">
                <Link to={`/product/${product._id}`}>
                  <span className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">${product.price}</p>
            </div>
  )
}

export default Product


