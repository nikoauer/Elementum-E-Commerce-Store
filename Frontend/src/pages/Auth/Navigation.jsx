import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import logo from "../../images/Logo3.svg";

export default function Navigation() {
  const [isNavVisible, setNavVisibility] = useState(false);

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };
  return (
    <>
      <nav id="" className="bg-white border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-14" alt="Elementum Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              ELEMENTUM
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="space-x-2">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            > <Link to="/login">Login</Link>
            </button>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            > <Link to="/register">Register</Link>
            </button>
            </div>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              onClick={toggleNav}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-700 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-cta"
              aria-expanded={isNavVisible}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isNavVisible ? "" : "hidden"
            }`}
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-50 rounded-lg bg-gray-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                to="/"
                  className="block py-2 px-3 md:p-0 text-black rounded font-semibold hover:bg-blue-200 md:hover:bg-transparent md:hover:text-blue-600"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                to="/shop"
                  className="block py-2 px-3 md:p-0 text-black rounded font-semibold hover:bg-blue-200 md:hover:bg-transparent md:hover:text-blue-600"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                to="/cart"
                  className="block py-2 px-3 md:p-0 text-black rounded font-semibold hover:bg-blue-200 md:hover:bg-transparent md:hover:text-blue-600"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                to="/favourites"
                  className="block py-2 px-3 md:p-0 text-black rounded font-semibold hover:bg-blue-200 md:hover:bg-transparent md:hover:text-blue-600"
                >
                  Favourites
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
