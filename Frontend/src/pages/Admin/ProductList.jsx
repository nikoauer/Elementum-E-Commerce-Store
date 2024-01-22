import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productAPISlice";
import { useFetchallCategoriesQuery } from "../../redux/api/categoryAPISlice";
import { toast } from "react-toastify";

const ProductList = () => {

    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [stock, setStock] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [qauntity, setQuantity] = useState('')
    const navigate = useNavigate()

    const [uploadProductImage] = useUploadProductImageMutation()
    const [ createProduct ] = useCreateProductMutation()
    const {data: categories} = useFetchallCategoriesQuery()


  return(
<>
    
</>
  )
};

export default ProductList;
