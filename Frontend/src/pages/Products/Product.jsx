import React from 'react'
import { Link } from "react-router-dom";
import FavouritesIcon from './FavouritesIcon';

const Product = ({ product }) => {
  return (
    <>
    <FavouritesIcon className='h-6 w-6' product={product}/>
      <div key={product._id} className="group relative mb-10">
              <div className="h-96 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 sm:h-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className='sm:flex sm:items-baseline sm:justify-between'>
              <h3 className="mt-4 text-base font-semibold text-gray-900">
                <Link to={`/product/${product._id}`}>
                  <span className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">${product.price}</p>
            </div>
        </div>
    </>
  )
}

export default Product


