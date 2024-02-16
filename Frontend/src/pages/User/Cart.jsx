import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LiaShippingFastSolid } from "react-icons/lia";
import { addToCart, removeFromCart } from '../../redux/features/cart/cartSlice';
import logo from '../../images/logo.png'

const Cart = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty}))
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  }

  return (
    <div className="flex items-center justify-center mt-1">
    <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mt-5">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className='mt-20'>
          <img
          className="mx-auto h-10 w-auto sm:h-12"
          src={logo}
          alt="Elementum Logo"
        />
        <div className="mx-auto max-w-2xl text-center sm:mt-10">
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Looks like your cart is empty</h1>
          <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
            Check out our <Link to='/shop' className='text-sky-600 hover:text-sky-700 font-semibold'>store</Link>
          </p>
        </div>
        </div>
        ) : ( 
          <form className="mt-12">
          <div>
            <h2 className="sr-only">Items in your shopping cart</h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {cartItems.map((item) => (
                <li key={item._id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-lg object-contain object-center sm:h-32 sm:w-32"
                    />
                  </div>

                  <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div>
                      <div className="flex justify-between sm:grid sm:grid-cols-2">
                        <div className="pr-6">
                          <h3 className="text-sm">
                            <Link to={`/product/${item._id}`} className="font-medium text-gray-700 hover:text-gray-800">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                        </div>
                        <p className="text-right text-md font-medium text-gray-900">${item.price}</p>
                      </div>

                      <div className="mt-4 flex items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block max-w-16">
                      <select
                      className="w-full p-1 border rounded text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.CountInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>                        
                      </div>

                    </div>
                    <div className='flex justify-between'>
                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                     <LiaShippingFastSolid className='h-6 w-6'/>
                      <span>Ships in 1-2 business days</span>
                    </p>
                    <button
                          type="button"
                          className="text-sm font-semibold hover:text-red-600 text-red-500"
                          onClick={() => removeFromCartHandler(item._id)}
                        >Remove
                        </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order summary */}
          <div className="mt-10 w-full">
            <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="sr-only">Order summary</h2>

              <div className="flow-root">
                <dl className="-my-4 divide-y divide-gray-200 text-sm">
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Number of Items</dt>
                    <dd className="font-medium text-gray-900">{cartItems.reduce((a, c) => a + parseInt(c.qty, 10), 0)}
</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-900 text-base font-medium">Subtotal</dt>
                    <dd className="text-base font-medium text-gray-900">${cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                className="w-full rounded-md border border-transparent bg-sky-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                or{' '}
                <Link to='/shop' className="font-medium text-sky-600 hover:text-sky-700">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </form>)}
      </div>
    </div>
  )
}

export default Cart