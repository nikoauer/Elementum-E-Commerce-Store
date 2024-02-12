import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

const createOrder = async(req, res) => {
    try {
        const {orderItems, shippingAddress, paymentMethod} = req.body

        if(orderItems && orderItems.length === 0)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export {createOrder}