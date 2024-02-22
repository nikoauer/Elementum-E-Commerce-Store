import React from 'react'
import {useSelector} from 'react-redux'
import {selectFavouriteProduct} from '../../redux/features/favourites/favouritesSlice'
import Product from './Product'
import FavouritesIcon from './FavouritesIcon'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'


const Favourites = () => {
    const favourites = useSelector(selectFavouriteProduct)

  return (
    <div className="flex items-center justify-center mt-1">
    <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
    <div className="flex justify-end">
      </div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="pt-5 pb-5 font-bold leading-6 text-gray-900 text-3xl">My Favourites</h1>
          {favourites.length === 0 ? (
            <div className='mt-20'>
            <img
            className="mx-auto h-20 w-20"
            src={logo}
            alt="Elementum Logo"
          />
          <div className="mx-auto max-w-2xl text-center sm:mt-10">
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Looks like you have no favourites saved</h1>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
              Check out our <Link to='/shop' className='text-sky-600 hover:text-sky-700 font-semibold'>store</Link>
            </p>
          </div>
          </div>
          ) : (
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {
                favourites.map((product) => (
                    <div key={product._id}>
                        <div className='mb-2 relative top-9 left-3'>
                            <FavouritesIcon product={product}/>
                        </div>
                    <div                    
                    className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                  >
                    <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                      />
                    </div>
                    <div className="flex flex-1 flex-col space-y-2 p-4 bg-gray-100">
                      <h3 className="text-sm font-semibold text-gray-900">
                        <Link to={`/product/${product._id}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          <div className='flex'>
                            {product.brand}
                          </div>
                        </Link>
                      </h3>
                      <h2 className='text-md'>{product.name}</h2>
                      <p className="text-sm text-gray-700">{product.description?.substring(0, 160)}...</p>
                      <div className="flex flex-1 flex-col justify-end">
                        <p className="text-base font-medium text-gray-900">${product.price}</p>
                      </div>
                    </div>
                  </div>
                  </div>
                ))
            }
            </div>
            )}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Favourites