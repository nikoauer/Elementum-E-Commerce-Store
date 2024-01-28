import { Fragment } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import logo from "../../images/logo8.svg";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  ShoppingCartIcon,
  BuildingStorefrontIcon,
  HomeIcon,
  ChevronDownIcon,
  ComputerDesktopIcon,
  GiftIcon,
  TagIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersAPISlice";
import { logout } from "../../redux/features/auth/authSlice";

export default function Navigation() {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-12 w-auto"
                    src={logo}
                    alt="Elementum Logo"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    to="/"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Home
                  </Link>
                  <Link
                    to="/shop"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Shop
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  <Link
                    to="/favourites"
                    className="mx-3 relative rounded-full bg-white p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <HeartIcon className="h-6 w-6" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/cart"
                    className="mr-5 relative rounded-full bg-white p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                  </Link>
                  {userInfo ? (
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          {userInfo.username}
                          <ChevronDownIcon
                            className="-mr-1 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {userInfo.isAdmin && (
                              <>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/admin/dashboard"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      Dashboard
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/admin/productlist"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      Products
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/admin/categorylist"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      Category
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/admin/orderlist"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      Orders
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/admin/userlist"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      Users
                                    </Link>
                                  )}
                                </Menu.Item>
                              </>
                            )}

                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/profile"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  Profile
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={logoutHandler}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block w-full px-4 py-2 text-left text-sm"
                                  )}
                                >
                                  Logout
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <div className="flex-shrink-0">
                      <Link
                        to="/signup"
                        className="mx-2 relative inline-flex items-center gap-x-1.5 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Sign Up
                      </Link>
                      <Link
                        to="/login"
                        className="relative inline-flex items-center gap-x-1.5 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Phone menu */}

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <NavLink
                as="a"
                to="/" 
                className="flex items-center border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                <div className="flex items-center">
                  <HomeIcon className="h-6 w-6" />
                  <span className="ml-2">Home</span>
                </div>
              </NavLink>
              <NavLink
              to="/shop"
                as="a"
                className="flex items-center border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                <div className="flex items-center">
                  <BuildingStorefrontIcon className="h-6 w-6" />
                  <span className="ml-2">Shop</span>
                </div>
              </NavLink>
              <NavLink
                to="/favourites"
                as="a"
                className="flex items-center border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                <div className="flex items-center">
                  <HeartIcon className="h-6 w-6" />
                  <span className="ml-2">Favourites</span>
                </div>
              </NavLink>
              <NavLink
                as="a"
                to="/cart"
                className="flex items-center border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                <div className="flex items-center">
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span className="ml-2">Cart</span>
                </div>
              </NavLink>
              {/* Seperating line in menu */}
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-gray-500"></span>
                </div>
              </div>
              {userInfo ? (
                <>
                  {userInfo.isAdmin && (
                    <>
                      <NavLink
                        as="a"
                        to="/admin/dashboard"
                        className="flex items-center border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                      >
                        <div
                          className="flex items-center"
                        >
                          <ComputerDesktopIcon className="h-6 w-6" />
                          <span className="ml-2">Dashboard</span>
                        </div>
                      </NavLink>
                      <NavLink
                        as="a"
                        to="/admin/productlist"
                        className="flex items-center border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                      >
                        <div
                          className="flex items-center"
                        >
                          <GiftIcon className="h-6 w-6" />
                          <span className="ml-2">Products</span>
                        </div>
                      </NavLink>
                      <NavLink
                        as="a"
                        to="/admin/categorylist"
                        className="flex items-center border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                      >
                        <div
                          className="flex items-center"
                        >
                          <TagIcon className="h-6 w-6" />
                          <span className="ml-2">Category</span>
                        </div>
                      </NavLink>
                      <NavLink
                        as="a"
                        to="/admin/orderlist"
                        className="flex items-center border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                      >
                        <div
                          className="flex items-center"
                        >
                          <ClipboardDocumentListIcon className="h-6 w-6" />
                          <span className="ml-2">Orders</span>
                        </div>
                      </NavLink>
                      <NavLink
                        as="a"
                        to="/admin/userlist"
                        className="flex items-center border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                      >
                        <div
                          className="flex items-center"
                        >
                          <UserGroupIcon className="h-6 w-6" />
                          <span className="ml-2">Users</span>
                        </div>
                      </NavLink>
                    </>
                  )}
                  <NavLink
                    as="a"
                    to="/profile"
                    className="flex items-center border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                  >
                    <div className="flex items-center">
                      <UserCircleIcon className="h-6 w-6" />
                      <span className="ml-2">Profile</span>
                    </div>
                  </NavLink>
                  <NavLink
                    as="a"
                    className="flex items-center border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                  >
                    <button
                      onClick={logoutHandler}
                      className="flex items-center"
                    >
                      <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
                      <span className="ml-2">Logout</span>
                    </button>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    as="a"
                    to="/login"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    as="a"
                    to="/signup"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
