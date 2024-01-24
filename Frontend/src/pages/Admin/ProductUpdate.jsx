import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUpdateProductMutation, useDeleteProductMutation,
useGetProductByIdQuery, useUploadProductImageMutation } from '../../redux/api/productAPISlice'
import { toast } from 'react-toastify'
import { useFetchallCategoriesQuery } from "../../redux/api/categoryAPISlice"


const ProductUpdate = () => {
    const params = useParams()
    const {data: productData} = useGetProductByIdQuery(params._id)
    const [ image, setImage ] = useState(productData?.image || "") 
    const [ name, setName ] = useState(productData?.name || "") 
    const [ price, setPrice ] = useState(productData?.price || "") 
    const [ description, setDescription ] = useState(productData?.description || "") 
    const [ brand, setBrand ] = useState(productData?.brand || "") 
    const [ category, setCategory ] = useState(productData?.category || "") 
    const [ quantity, setQuantity ] = useState(productData?.quantity || "") 
    const [ CountInStock, setCountInStock ] = useState(productData?.CountInStock || "") 

    const navigate = useNavigate()

    const {data: categories = []} = useFetchallCategoriesQuery()
    const [uploadProductImage] = useUploadProductImageMutation()
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    useEffect(() => {
        if (productData && productData._id) {
            setName(productData.name)
            setDescription(productData.description)
            setPrice(productData.price)
            setQuantity(productData.quantity)
            setCategory(productData.categories?._id)
            setBrand(productData.brand)
            setImage(productData.image)
            setCountInStock(productData.CountInStock)
        }
    }, [productData])

  return (
      <div>
      </div>
        )
}

export default ProductUpdate