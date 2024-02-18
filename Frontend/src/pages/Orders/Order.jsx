import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import logo from "../../images/logo.png";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderAPIslice";

const Order = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliveryOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadingPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "AUD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function createOrder(data, actions) {
    return actions.order.create({
        purchase_units: [{amount: {value: order.totalPrice}}],
    }).then((orderID) => {
        return orderID
    })
  }

  function onError(err) {
    toast.error(err.message, {position: "top-center"});
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
        try {
            await payOrder({orderId, details})
            refetch()
            toast.success("Order successfuly paid", {position: "top-center"})
        } catch (error) {
            toast.error(error?.data?.message || error.message, {position: "top-center"});
        }
    })
  }

  const deliveryHandler = async () => {
    await deliveryOrder(orderId);
    refetch();
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <div className="flex items-center justify-center mt-1">
      <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
        {order.orderItems.length === 0 ? (
          <Message>Order is empty</Message>
        ) : (
          <div className="bg-white">
            <div
              className="fixed left-0 top-0 hidden w-1/2 bg-white lg:block"
              aria-hidden="true"
            />
            <div
              className={`fixed right-0 hidden h-full w-1/2 bg-sky-700 lg:block ${isScrolled ? ('top-0') : ('top-16')}`}
              aria-hidden="true"
            />

            <header className="relative mx-auto max-w-7xl py-4 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:bg-transparent lg:px-8 lg:pb-10 lg:pt-16">
              <div className="mx-auto flex max-w-2xl px-4 lg:w-full lg:max-w-lg lg:px-0">
                <span className="sr-only">ELMNTM</span>
                <img
                  src={logo}
                  alt="logo"
                  className="hidden h-10 w-auto lg:block"
                />
              </div>
            </header>

            <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8">
              <section
                aria-labelledby="summary-heading"
                className="bg-sky-700 pb-12 rounded-md text-white md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pb-24 lg:pt-0"
              >
                <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                  <dl>
                    <dd className="mt-1 text-3xl font-bold tracking-tight text-white">Items</dd>
                  </dl>

                  <ul
                    role="list"
                    className="divide-y divide-white divide-opacity-10 text-sm font-medium"
                  >
                    {order.orderItems.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-4 py-6"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 flex-none rounded-md object-cover object-center"
                        />
                        <div className="flex-auto space-y-1">
                          <h3 className="text-white">{item.name}</h3>
                          <p>Qauntity: {item.qty}</p>
                          <p>$ {item.price}</p>
                        </div>
                        <p className="flex-none text-base font-medium text-white">
                          $ {(item.qty * item.price).toFixed(2)}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
                    <div className="flex items-center justify-between">
                      <dt>Subtotal</dt>
                      <dd>$ {order.itemsPrice.toFixed(2)}</dd>
                    </div>

                    <div className="flex items-center justify-between">
                      <dt>Shipping</dt>
                      <dd>$ {order.shippingPrice.toFixed(2)}</dd>
                    </div>

                    <div className="flex items-center justify-between">
                      <dt>Taxes</dt>
                      <dd>$ {order.taxPrice.toFixed(2)}</dd>
                    </div>

                    <div className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
                      <dt className="text-base">Total</dt>
                      <dd className="text-base">
                        $ {order.totalPrice.toFixed(2)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              <section
                aria-labelledby="payment-and-shipping-heading"
                className="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0"
              >
                <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                  <div>
                    <h3
                      id="OrderID"
                      className="text-xl font-semibold text-gray-900"
                    >
                      Order ID: {order._id}
                    </h3>

                    <h3
                      id="contact-info-heading"
                      className="text-xl mt-5 font-medium text-gray-900"
                    >
                      Customer Details
                    </h3>
                    <div className="mt-2">
                      <div>
                        <p className="block text-md font-lg text-gray-800">
                          <strong>Name:</strong>
                          <span> {order.user.username}</span>
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="block text-md font-lg text-gray-800">
                          <strong>Email address:</strong>
                          <span> {order.user.email}</span>
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="block text-md font-lg text-gray-800">
                          <strong>Address:</strong>
                          <span>
                            {" "}
                            {order.shippingAddress.address},{" "}
                            {order.shippingAddress.city}{" "}
                            {order.shippingAddress.postalCode},{" "}
                            {order.shippingAddress.state},{" "}
                            {order.shippingAddress.country}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3
                      id="PaymentMethod"
                      className="text-lg font-medium text-gray-800 my-2"
                    >
                      Payment Status
                    </h3>
                    {order.isPaid ? (
                      <Message variant="success">
                        Paid on {order.paidAt}
                      </Message>
                    ) : (
                      <Message variant="danger">Unpaid</Message>
                    )}
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900">
                      Payment Options
                    </h3>
                  </div>
                  <div className="mt-3 flex justify-center border-t border-gray-200 pt-6">
                    {!order.isPaid && (
                      <div>
                        {loadingPay && <Loader />}
                        {isPending ? <Loader /> : <div>
                            <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                            >
                            </PayPalButtons>
                            </div>}
                      </div>
                    )}
                  </div>
                  {loadingDeliver && <Loader />}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                      <>
                    <div>
                    <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-3">
                      Change Delivery Status
                    </h3>
                  </div>
                    <div>
                        <button
                        type="button"
                        className="mt-4 rounded-md w-full bg-sky-600  py-2 text-md font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                        onClick={deliveryHandler}
                        >
                        Mark As Delivered
                        </button>
                    </div>
                    </>
                    )}
                </div>
              </section>
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
