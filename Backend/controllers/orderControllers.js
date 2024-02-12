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

const countTotalOrders = async(req, res) => {
    try {
        const totalOrders = await Order.countDocuments()
        res.json({totalOrders})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const calculateTotalSalesByDate = async (req, res) => {
    try {
      const salesByDate = await Order.aggregate([
        {
          $match: {
            isPaid: true,
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
            },
            totalSales: { $sum: "$totalPrice" },
          },
        },
      ]);
  
      res.json(salesByDate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const calculateTotalSales = async(req, res) => {
    try {
        const orders = await Order.find()
        const totalSales = orders.reduce((sum, order) => sum +order.totalPrice, 0)
        res.json(totalSales)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const findOrderById = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'username email')

        if(order) {
            res.json(order)
        } else {
            res.status(404)
            throw new Error("Order not found")
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const markOrderAsPaid = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if(order) {
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address,
            }

            const updateOrder = await Order.save()
            res.status(200).json(updateOrder)
        } else{
            res.status(400)
            throw new Error("order not found")
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export {createOrder, markOrderAsPaid, getAllOrders, getUserOrder, findOrderById, countTotalOrders, calculateTotalSalesByDate, calculateTotalSales}