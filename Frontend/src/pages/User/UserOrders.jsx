import React from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderAPIslice";

const UserOrders = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="flex items-center justify-center mt-1">
      <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
        <h1 className="text-2xl font-semibold my-5">My Orders</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.error || error.error}
          </Message>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
