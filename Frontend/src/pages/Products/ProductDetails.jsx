import React from "react";
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productAPISlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaArrowLeft } from "react-icons/fa";
import moment from "moment";
import FavouritesIcon from "./FavouritesIcon";
import {
  HeartIcon,
  MinusIcon,
  PlusIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { Disclosure } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  return (
    <>
      <div className="flex items-center justify-center mt-1">
        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
          <Link to="/">
            <button
              type="button"
              className="rounded-full bg-sky-600 p-1 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              <FaArrowLeft className="h-5 w-5" />
            </button>
          </Link>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.message}
            </Message>
          ) : (
            <>
              <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center rounded-md"
                />
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-10">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    {product.name}
                  </h1>
                  <div className="flex items-center mt-2 text-md font-medium text-gray-600">
                    <TagIcon className="h-6 w-6 mr-2" />
                    {product.brand}
                  </div>
                  <div className="mt-3">
                    <p className="text-3xl tracking-tight text-gray-900">
                      ${product.price}
                    </p>
                  </div>
                  <div className="mt-6">
                    <div
                      className="space-y-6 text-base text-gray-700"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                    <div className="mt-10 flex">
                <button
                  type="submit"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-sky-600 px-8 py-3 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Add to cart
                </button>

                <button
                  type="button"
                  className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>

                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
