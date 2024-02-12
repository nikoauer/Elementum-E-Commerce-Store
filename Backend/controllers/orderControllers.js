import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

function calculatePrices(orderItems) {
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    const shippingPrice = itemsPrice > 80 ? 0 : 10;
    const taxRate = 0.10
    const taxPrice = (itemsPrice * taxRate).toFixed(2)

    const totalPrice = (
        itemsPrice + shippingPrice + parseFloat(taxPrice).toFixed(1)
    )
    return {
        itemsPrice: itemsPrice.toFixed(2), 
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice,
        totalPrice,
    }
}

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

export {createOrder}