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
  TagIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Ratings from "../../components/Ratings";
import { Disclosure } from "@headlessui/react";

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

  const details = [
    {
      name: "60 Day Returns",
      information:
        "If you are not completely satisfied, you are welcome to exchange your purchase with the original receipt for a full refund, store credit, or an alternative product, within 60 days. The returned product must be unused, and in the original packaging with all tags still intact.",
    },
    {
      name: "Warranty and Repairs",
      information:
        "We trust our gear completely. If a product fails due to a major manufacturing fault or material defect, you can ask for a replacement, refund, or we will repair it free of charge. For non-Macpac branded products, we will always work with you to determine whether a repair, replacement or refund is appropriate.",
    },
    {
      name: "Delivery",
      information:"Our trusted shipping partners are Australia Post, Couriers Please and TNT (FedEx). Please note, our online orders are only dispatched by our team Monday-Friday (excluding public holidays). Your order will be dispatched within a maximum of 2 working days unless otherwise advised. Should you require a faster turnaround of your order, please contact us by email or phone."
    }
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const addToCartHandler = () => {

  }

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
                <div className="col-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full object-contain w-full rounded-md"
                />
                </div>

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
                  <div className="mt-2">
                    <Ratings
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </div>
                  <div className="mt-6">
                    <div
                      className="space-y-6 text-base text-gray-700"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  <div className="mt-5">
                    {product.CountInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
                    >
                      {[...Array(product.CountInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                </div>
                    <div className="mt-5 flex">
                      <button
                        type="submit"
                        onClick={addToCartHandler}
                        disabled={product.CountInStock === 0}
                        className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-sky-600 px-8 py-3 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                      >
                        Add to cart
                      </button>

                      <button
                        type="button"
                        className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                      >
                        <HeartIcon
                          className="h-6 w-6 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Add to favorites</span>
                      </button>
                    </div>
                    <div className="divide-y divide-gray-200 border-t mt-10">
                        {details.map((detail) => (
                          <Disclosure as="div" key={detail.name}>
                            {({ open }) => (
                              <>
                                <h3>
                                  <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                    <span
                                      className={classNames(
                                        open
                                          ? "text-sky-600"
                                          : "text-gray-700",
                                        "text-sm font-medium"
                                      )}
                                    >
                                      {detail.name}
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon
                                          className="block h-6 w-6 text-sky-400 group-hover:text-sky-500"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel
                                  as="div"
                                  className="prose prose-sm pb-6"
                                >
                                  <p className="text-gray-700">{detail.information}</p>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
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
