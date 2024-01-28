import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "./redux/api/productAPISlice";
import Message from "./components/Message";
import Loader from "./components/Loader";
import Carousel from "./components/Carousel";
import Banner from "./images/Banner.png"


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
        <div className="flex justify-center">
            <img src={Banner} alt="Be in your element" className="min-w-full" />
        </div>
          <div className="flex items-center justify-center mt-1">
            <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
                <div className="pt-5">
                 <Carousel />
                </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
