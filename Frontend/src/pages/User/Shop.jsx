import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../../redux/api/productAPISlice";
import {
  setCategories,
  setChecked,
  setProducts,
} from "../../redux/features/shop/shopSlice";
import Loader from "../../components/Loader";
import { useFetchallCategoriesQuery } from "../../redux/api/categoryAPISlice";

import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  const categoriesQuery = useFetchallCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const getFilteredProducts = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!getFilteredProducts.isLoading) {
        const filteredProducts = getFilteredProducts.data.filter((product) => {
          return (
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
          );
        });
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, getFilteredProducts.data, dispatch, priceFilter]);

  const handleBrand = (brand) => {
    const productsByBrand = getFilteredProducts.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedCheck = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedCheck));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        getFilteredProducts.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }


  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Categories */}
                  <form className="mt-4">
                    <Disclosure
                      as="div"
                      className="border-t border-gray-200 pb-4 pt-4"
                    >
                      {({ open }) => (
                        <fieldset>
                          <legend className="w-full px-2">
                            <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                              <span className="text-sm font-medium text-gray-900">
                                Category
                              </span>
                              <span className="ml-6 flex h-7 items-center">
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? "-rotate-180" : "rotate-0",
                                    "h-5 w-5 transform"
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </legend>
                          <Disclosure.Panel className="px-4 pb-2 pt-4">
                            <div className="space-y-6">
                              {categories.map((category) => (
                                <div
                                  key={category._id}
                                  className="flex items-center"
                                >
                                  <input
                                    id={category._id}
                                    name={category.name}
                                    onChange={(e) =>
                                      handleCheck(
                                        e.target.checked,
                                        category._id
                                      )
                                    }
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                                  />
                                  <label
                                    htmlFor={category.name}
                                    className="ml-3 text-sm text-gray-500"
                                  >
                                    {category.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </fieldset>
                      )}
                    </Disclosure>
                  </form>
                  {/* Brands */}
                  <form>
                    <Disclosure
                      as="div"
                      className="border-t border-gray-200 pb-4 pt-4"
                    >
                      {({ open }) => (
                        <fieldset>
                          <legend className="w-full px-2">
                            <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                              <span className="text-sm font-medium text-gray-900">
                                Brands
                              </span>
                              <span className="ml-6 flex h-7 items-center">
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? "-rotate-180" : "rotate-0",
                                    "h-5 w-5 transform"
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </legend>
                          <Disclosure.Panel className="px-4 pb-2 pt-4">
                            <div className="space-y-6">
                              {uniqueBrands?.map((brand) => (
                                <div key={brand} className="flex items-center">
                                  <input
                                    id={brand}
                                    name="brand"
                                    onChange={() => handleBrand(brand)}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                                  />
                                  <label
                                    htmlFor={brand}
                                    className="ml-3 text-sm text-gray-500"
                                  >
                                    {brand}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </fieldset>
                      )}
                    </Disclosure>
                  </form>

                  {/* Price */}
                  <form>
                    <Disclosure
                      as="div"
                      className="border-t border-gray-200 pb-4 pt-4"
                    >
                      {({ open }) => (
                        <fieldset>
                          <legend className="w-full px-2">
                            <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                              <span className="text-sm font-medium text-gray-900">
                                Price
                              </span>
                              <span className="ml-6 flex h-7 items-center">
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? "-rotate-180" : "rotate-0",
                                    "h-5 w-5 transform"
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </legend>
                          <Disclosure.Panel className="px-4 pb-2 pt-4">
                            <div className="space-y-6">
                              <input
                                type="text"
                                placeholder="Enter Price"
                                value={priceFilter}
                                onChange={handlePriceChange}
                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-sky-500"
                              />
                            </div>
                          </Disclosure.Panel>
                        </fieldset>
                      )}
                    </Disclosure>
                  </form>
                  {/* Reset Button */}
                  <div className="p-5">
                    <button
                      className="w-full rounded-md bg-sky-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                      onClick={() => window.location.reload()}
                    >
                      Reset
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="border-b border-gray-200 pb-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>
            <p className="mt-4 text-base text-gray-500">
              Checkout out the latest release of Basic Tees, new and improved
              with four openings!
            </p>
          </div>

          <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filters</h2>

              <button
                type="button"
                className="inline-flex items-center lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="text-sm font-medium text-gray-700">
                  Filters
                </span>
                <PlusIcon
                  className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
              </button>

              {/* desktop categories */}
              <div className="hidden lg:block">
                <form className="space-y-10 divide-y divide-gray-200">
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-900">
                      Category
                    </legend>
                    <div className="space-y-3 pt-6">
                      {categories.map((category) => (
                        <div key={category._id} className="flex items-center">
                          <input
                            id={category._id}
                            name={category.name}
                            onChange={(e) =>
                              handleCheck(e.target.checked, category._id)
                            }
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                          />
                          <label
                            htmlFor={category.name}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </form>
              </div>

              <div className="hidden lg:block">
                <div className="w-full border-t border-gray-200 my-8" />
              </div>

              {/* desktop brands */}
              <div className="hidden lg:block">
                <form className="space-y-10 divide-y divide-gray-200">
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-900">
                      Brands
                    </legend>
                    <div className="space-y-3 pt-6">
                      {uniqueBrands.map((brand) => (
                        <div key={brand} className="flex items-center">
                          <input
                            id={brand}
                            name={brand}
                            onChange={() => handleBrand(brand)}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                          />
                          <label
                            htmlFor={brand}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </form>
              </div>

              <div className="hidden lg:block">
                <div className="w-full border-t border-gray-200 my-8" />
              </div>

              <div className="hidden lg:block">
                <form className="space-y-6">
                  <legend className="block text-sm font-medium text-gray-900">
                    Price
                  </legend>
                  <div className="space-y-5">
                    <input
                      type="text"
                      placeholder="Enter Price"
                      value={priceFilter}
                      onChange={handlePriceChange}
                      className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-sky-500"
                    />
                  </div>
                </form>
              </div>

              <div className="hidden lg:block">
                <div className="w-full border-t border-gray-200 my-8" />
              </div>

              <div className="hidden lg:block">
                    <button
                      className="w-full rounded-md bg-sky-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                      onClick={() => window.location.reload()}
                    >
                      Reset
                    </button>
                  </div>

            </aside>

            {/* Product grid */}
            <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
              {/* Your content */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;
