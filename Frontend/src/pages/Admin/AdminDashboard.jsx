import Chart from "react-apexcharts";
import { useGetUserQuery } from "../../redux/api/usersAPISlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderAPIslice";
import { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import OrderList from "./OrderList";
import {
CurrencyDollarIcon
} from "@heroicons/react/24/outline";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUserQuery();
  const { data: orders, isLoading: loading2 } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesData = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));
      setState((previousState) => ({
        ...previousState,
        options: {
          ...previousState.options,
          xaxis: {
            categories: formattedSalesData.map((item) => item.x),
          },
        },
        serioes: [
          { name: "Sales", data: formattedSalesData.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
        <div className="sm:flex-auto">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold ">
              Administration Dashboard
            </h1>
            <AdminNav />
          </div>
        </div>
        <section>
        <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <div className="absolute rounded-md bg-indigo-500 p-3">
                <CurrencyDollarIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
            <dt className="truncate text-sm font-medium text-gray-500">$ {isLoading ? (<Loader />) : (sales.totalSales.toFixed(2))}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900"></dd>
          </div>
      </dl>
    </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
