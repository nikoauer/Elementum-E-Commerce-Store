import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressStep";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderAPIslice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { FaCcPaypal } from "react-icons/fa";


const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async() => {
    try {
        const res = await createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        }).unwrap();
        dispatch(clearCartItems());
        navigate(`/order/${res._id}`);
      } catch (error) {
        toast.error(error, {position: "top-center"});
      }
  }

  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-center mt-1">
      <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
        {cart.clearCartItems === 0 ? (
          <Message>Cart is Empty</Message>
        ) : (
          <div>
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900">
                  Order Summary
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Your purchase is nearly complete. Please confirm your order
                  and we will get it sent out to you as soon as possible.
                </p>
              </div>
            </div>
            <div className="my-10">
              <ProgressSteps step1 step2 step3 />
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                        >
                          Image
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Qauntity
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {cart.cartItems.map((item, index) => (
                        <tr key={index} className="even:bg-gray-50">
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-md"
                            />
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                            {item.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                            {item.qty}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                            ${item.qty * item.price.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && <Message variant="danger">{error.data.message}</Message>}

        <div className="mt-10">
        <div className="bg-gray-100 px-4 py-6 rounded-lg sm:px-6 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-8">
      <dl className="lg:pl-5">
              <div>
                <dt className="text-lg font-semibold mt-5 text-gray-900">Shipping address</dt>
                <dd className="mt-3 text-gray-600">
                  <span className="block">{cart.shippingAddress.address}</span>
                  <span className="block">{cart.shippingAddress.city}</span>
                  <span className="block">{cart.shippingAddress.state}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</span>
                </dd>
              </div>
              <div>
              <h2 className="text-lg font-semibold my-4">Payment Method</h2>
                <div className="flex items-center"> 
                    <p className="text-md font-medium">Method: </p>{cart.paymentMethod} 
                    {cart.paymentMethod === 'PayPal' && <FaCcPaypal className="ml-2 h-6 w-6" />} 
                </div>
             </div>
            </dl>
            

            <div
          aria-labelledby="summary-heading"
          className="mt-5 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-1 lg:p-8"
        >
          <h2
            id="summary-heading"
            className="text-lg font-medium text-gray-900"
          >
            Order summary
          </h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">
                ${cart.itemsPrice}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex items-center text-sm text-gray-600">
                <span className="pr-1">Shipping</span>
                <div className="relative flex flex-col items-center group">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
                    <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-700 shadow-lg rounded-lg px-4">
                      Free shipping for all orders over $80.
                    </span>
                    <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-700"></div>
                  </div>
                </div>
              </dt>
              <dd className="text-sm font-medium text-gray-900">
                ${cart.shippingPrice}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex text-sm text-gray-600">
                <span>Tax</span>
              </dt>
              <dd className="text-sm font-medium text-gray-900">
                ${cart.taxPrice}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">
                Order total
              </dt>
              <dd className="text-base font-medium text-gray-900">
                ${cart.totalPrice}
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-6 col-span-2">
            <button
              type="submit"
              disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              className="w-full rounded-md border border-transparent bg-sky-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Checkout
            </button>
            </div>
          </div>
          {isLoading && <Loader />}
          </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
