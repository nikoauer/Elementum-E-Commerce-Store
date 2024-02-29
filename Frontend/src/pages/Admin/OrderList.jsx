import React from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderAPISlice";
import AdminNav from "../Admin/AdminNav"

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="flex items-center justify-center mt-1">
      <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div>
            <div className="px-4 sm:px-6 lg:px-5">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold ">All Orders</h1>
                    <AdminNav />
                </div>
                <p className="py-2 text-sm text-gray-700">All orders are displayed here along with allowing you to controll the delivery status on each order.</p>
                </div>
            </div>
      
      <div className="mt-1 flow-root">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>

                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    ID
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Total
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Payment Status
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Delivery Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <img className="h-11 w-11 rounded-full border-2 border-gray-400" src={order.orderItems[0].image} alt={order.name} />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{order._id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">{order.createdAt.substring(0, 10)}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="mt-1 text-gray-500">$ {(order.totalPrice).toFixed(2)}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span className="">
                      {order.isPaid ? (
                    <p className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Completed
                    </p>
                  ) : (
                    <p className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                      Pending
                    </p>
                  )}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span className="">
                      {order.isDelivered ? (
                    <p className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Completed
                    </p>
                  ) : (
                    <p className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                      Pending
                    </p>
                  )}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{order.role}</td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <Link to={`/order/${order._id}`}>
                    <button className="rounded bg-sky-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                        View Details
                    </button>
                    </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
          </div>
      )}
    </div>
    </div>
  );
};

export default OrderList;
