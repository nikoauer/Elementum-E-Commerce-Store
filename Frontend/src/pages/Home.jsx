import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productAPISlice";
import Message from "../components/Message";
import Carousel from "../components/Carousel";
import Banner from "../images/Homebanner.png";
import Product from "./Products/Product";



const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
        <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      ) : isError ? (
        <Message variant="danger">
           {isError?.data?.message || "An error occurred"} 
        </Message>
      ) : (
        <>
<div className="relative">
  <img src={Banner} alt="Be in your element" className="min-w-full" />
  <div className="absolute inset-0 flex justify-center items-center mt-10">
    <button className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-5 rounded-md">
      <Link to='/shop'>Shop Now</Link>
    </button>
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
