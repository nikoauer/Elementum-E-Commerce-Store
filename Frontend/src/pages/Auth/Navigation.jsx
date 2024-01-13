import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo8.svg";
import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  ShoppingCartIcon,
  BuildingStorefrontIcon,
  HomeIcon,
  UserIcon
} from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersAPISlice";
import { logout } from "../../redux/features/auth/authSlice";

export default function Navigation() {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLoginMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDropdown = () => {
    console.log("hello");
  };

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
                  {userInfo && (
                    <div className="inline-flex items-center  border-transparent px-3 pt-1 text-sm font-medium text-blue-600 hover:border-gray-300 hover:text-gray-500">
                      <Link>
                        {userInfo.username}
                      </Link>
                    </div>
                  )}
                  <button
                    type="button"
                    className="relative rounded-full bg-white p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Link to="/favourites">
                      <HeartIcon className="h-6 w-6" aria-hidden="true" />
                    </Link>
                  </button>
                  <button
                    type="button"
                    className="mx-3 relative rounded-full bg-white p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Link to="/cart">
                      <ShoppingCartIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </Link>
                  </button>
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="mx-2 relative inline-flex items-center gap-x-1.5 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <Link to="/signup">Sign Up</Link>
                    </button>
                    <button
                      type="button"
                      className="relative inline-flex items-center gap-x-1.5 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <Link to="/login">Login</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Disclosure.Button
                as="a"
                className="flex items-center border-l-4 border-sky-500 bg-sky-100 py-2 pl-3 pr-4 text-base font-medium text-blue-700 sm:pl-5 sm:pr-6"
              >
                <Link to="/" className="flex items-center">
                  <HomeIcon className="h-6 w-6" />
                  <span className="ml-2">Home</span>
                </Link>
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                className="flex items-center border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                <Link to="/shop" className="flex items-center">
                  <BuildingStorefrontIcon className="h-6 w-6" />
                  <span className="ml-2">Shop</span>
                </Link>
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                className="flex items-center border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                <Link to="/favourites" className="flex items-center">
                  <HeartIcon className="h-6 w-6" />
                  <span className="ml-2">Favourites</span>
                </Link>
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                className="flex items-center border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                <Link to="/cart" className="flex items-center">
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span className="ml-2">Cart</span>
                </Link>
              </Disclosure.Button>
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
              {userInfo ? <Disclosure.Button
                as="a"
                className="flex items-center border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                <Link className="flex items-center">
                  <UserIcon className="h-6 w-6" />
                  <span className="ml-2">{userInfo.username}</span>
                </Link>
              </Disclosure.Button> : 
              <>
              <Disclosure.Button
                as="a"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                <Link to="/login">Login</Link>
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                <Link to="/signup">Sign Up</Link>
              </Disclosure.Button>
              </>
              }
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
