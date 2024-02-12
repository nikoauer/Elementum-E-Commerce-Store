function calculatePrices(orderItems) {
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    const shippingPrice = itemsPrice > 80 ? 0 : 10;
    const taxRate = 0.10
    const taxPrice = (itemsPrice * taxRate).toFixed(2)

    const totalPrice = (itemsPrice + shippingPrice + parseFloat(taxPrice)).toFixed(1)
    return {
        itemsPrice: itemsPrice.toFixed(2), 
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice,
        totalPrice,
    }
}

export default calculatePrices