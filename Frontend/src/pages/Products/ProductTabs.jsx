import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Ratings from '../../components/Ratings'
import { useGetTopProductsQuery } from '../../redux/api/productAPISlice'
import Loader from '../../components/Loader'

const ProductTabs = ({loadingProductReview, userInfo, submitHandler, rating, setRating, comment, setComment, product}) => {
  
    const {data, isLoading} = useGetTopProductsQuery()

    const [activeTab, setActiveTab] = useState(1)

    if(isLoading) {
        return <Loader />
    }
  
    return (
    <div></div>
  )
}

export default ProductTabs