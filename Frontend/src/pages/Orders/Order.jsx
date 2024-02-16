import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButton, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderAPIslice";

const Order = () => {
  return <div>Order</div>;
};

export default Order;
