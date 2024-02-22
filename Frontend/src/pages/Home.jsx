import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productAPISlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Carousel from "../components/Carousel";
import Banner from "../images/Banner.png";
import Product from "./Products/Product";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
            <div className="relative">
              <img src={Banner} alt="Be in your element" className="min-w-full" />
              <div className="absolute xl:left-10 md:left-10 sm:left-5 top-1/2 transform -translate-y-1/2 sm:w-1/3  md:w-1/3 lg:w-1/3">
                <h1 className="text-white xl:text-8xl lg:text-5xl md:text-4xl sm:text-3xl font-bold mb-2 sm:py-2">
                  Don't let the elements stop the adventure
                </h1>
                  <Link to="/shop" className="inline-flex items-center bg-sky-500 hover:bg-sky-600 text-black hover:text-white px-2 sm:px-4 py-1 sm:py-2 rounded text-sm sm:text-base">
                    <span>Shop the latest gear</span>
                    <FaArrowRight className="ml-2" />
                  </Link>
              </div>
            </div>

          <div className="flex items-center justify-center mt-1">
            <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
              <div className="pt-5 pb-5">
                <Carousel />
              </div>
            <div>
  
            <div className="sm:flex sm:items-baseline sm:justify-between mt-5">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">New Tents</h1>
            <Link to='/shop' className="hidden text-sm font-semibold text-sky-600 hover:text-blue-700 sm:block">
            Browse all gear
            <span aria-hidden="true"> &rarr;</span>
          </Link>
          </div>
            <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
