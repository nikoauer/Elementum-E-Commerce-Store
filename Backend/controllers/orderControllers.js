import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import calculatePrices from "../utils/calculatePrice.js";

const createOrder = async(req, res) => {
    try {
        const {orderItems, shippingAddress, paymentMethod} = req.body

        if(orderItems && orderItems.length === 0) {
            res.status(400)
            throw new Error('No order items')
        }

        const dbItems = await Product.find({
            _id: {$in: orderItems.map((x) => x._id)}
        })

        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = dbItems.find((dbItems) => dbItems._id.toString() === itemFromClient._id)
        
            if(!matchingItemFromDB) {
                res.status(404)
                throw new Error(`Product not found: ${itemFromClient._id}`)
            }
            return {
                ...itemFromClient,
                product: itemFromClient._id,
                price: matchingItemFromDB.price,
                _id: undefined,
            }
        })

        const {itemsPrice, taxPrice, shippingPrice, totalPrice} = calculatePrices(dbOrderItems)

        const order = new Order ({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getAllOrders = async(req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id username')
        res.json(orders)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getUserOrder = async(req, res) => {
    try {
        const orders = await Order.find({user: req.user._id})
        res.json(orders)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export {createOrder, getAllOrders, getUserOrder}