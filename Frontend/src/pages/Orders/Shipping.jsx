import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { saveShippingAddress, savePaymentMethod } from '../../redux/features/cart/cartSlice'


const Shipping = () => {

const [paypaylMethod, setPaypalMethod] = useState('Paypal')
const [address, setAddress] = useState(shippingAddress.address || '')
const [city, setCity] = useState(shippingAddress.city || '')
const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
const [state, setState] = useState(shippingAddress.state || '')
const [country, setCountry] = useState(shippingAddress.country || '')

const cart = useSelector((state) => state.cart)
const {shippingAddress} = cart

const dispatch = useDispatch()
const navigate = useNavigate()

useEffect(() => {
    if(!shippingAddress.address) {
        navigate('/shipping')
    }
}, [navigate, shippingAddress])

  return (
    <div>Shipping</div>
  )
}

export default Shipping