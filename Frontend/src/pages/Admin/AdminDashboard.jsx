import Chart from "react-apexcharts";
import { useGetUserQuery } from "../../redux/api/usersAPISlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderAPISlice";
import { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import OrderList from "./OrderList";
import {
  CurrencyDollarIcon,
  UsersIcon,
  TruckIcon,
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
        theme: "light",
      },
      colors: ["#00A36C"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "center",
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
        x: new Date(item._id).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        y: item.totalSales,
      })).sort((a, b) => new Date(a.x) - new Date(b.x));
  

      setState((previousState) => ({
        ...previousState,
        options: {
          ...previousState.options,
          xaxis: {
            categories: formattedSalesData.map((item) => item.x),
          },
        },
        series: [
          { name: "Sales", data: formattedSalesData.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

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
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <div className="absolute rounded-md bg-blue-500 p-3">
                <CurrencyDollarIcon
                  className="h-7 w-7 text-white"
                  aria-hidden="true"
                />
              </div>
              <dt className="text-sm font-medium text-gray-500 ml-16">
                Total Sales
              </dt>
              <dd className="mt- text-3xl font-semibold tracking-tight text-gray-900 ml-16">
                ${isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
              </dd>
            </div>

            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <div className="absolute rounded-md bg-blue-500 p-3">
                <UsersIcon className="h-7 w-7 text-white" aria-hidden="true" />
              </div>
              <dt className="text-sm font-medium text-gray-500 ml-16">
                Total Customers
              </dt>
              <dd className="mt- text-3xl font-semibold tracking-tight text-gray-900 ml-16">
                {isLoading ? <Loader /> : customers?.length}
              </dd>
            </div>

            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <div className="absolute rounded-md bg-blue-500 p-3">
                <TruckIcon className="h-7 w-7 text-white" aria-hidden="true" />
              </div>
              <dt className="text-sm font-medium text-gray-500 ml-16">
                Total Orders
              </dt>
              <dd className="mt- text-3xl font-semibold tracking-tight text-gray-900 ml-16">
                {isLoading ? <Loader /> : orders?.totalOrders}
              </dd>
            </div>
          </dl>

          <div className="flex justify-center mt-8 px-4 border bg-white rounded-md shadow">
            <div style={{ width: "100%", maxWidth: "1200px" }}>
              <Chart
              className='p-5'
                options={state.options}
                series={state.series}
                type="line"
                width="100%"
              />
            </div>
          </div>
          <div className="mt-10">
            <OrderList />
          </div>

        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
