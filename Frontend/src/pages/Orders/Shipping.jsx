import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressStep from "../../components/ProgressStep";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [state, setState] = useState(shippingAddress.state || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = () => {};

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-10">
          Shipping
        </h1>
        <ProgressStep step1 step2 />
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 pb-12 md:grid-cols-3 border-b border-t border-gray-300 py-10 scroll-px-3.5">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Shipping Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Please input your shipping details
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="col-span-full">
                <label
                  htmlFor="Address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street Address
                </label>
                <div className="mt-2">
                  <input
                    id="Address"
                    name="Address"
                    type="text"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="City"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="City"
                    id="City"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="State"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Territory
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="State"
                    id="State"
                    value={state}
                    required
                    onChange={(e) => setState(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="PostalCode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="PostalCode"
                    id="PostalCode"
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="Country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="Country"
                    id="Country"
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="PostalCode" className="block text-gray-900">
                  Select Method
                </label>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      name="paymentMethod"
                      value="PayPal"
                      checked={paymentMethod === "PayPal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />

                    <span className="ml-2">PayPal or Credit Card</span>
                  </label>
                </div>
              </div>
              <div >
                <button onClick={submitHandler} className="w-full rounded-md bg-sky-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
