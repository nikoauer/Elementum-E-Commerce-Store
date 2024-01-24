import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productAPISlice";
import { useFetchallCategoriesQuery } from "../../redux/api/categoryAPISlice";
import { toast } from "react-toastify";
import { PhotoIcon } from '@heroicons/react/24/solid'
import AdminNav from "./AdminNav";


const ProductList = () => {

    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [CountInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const navigate = useNavigate()

    const [ uploadProductImage ] = useUploadProductImageMutation()
    const [ createProduct ] = useCreateProductMutation()
    const {data: categories} = useFetchallCategoriesQuery()

    const uploadFileHandler = async (event) => {

      const formData = new FormData()
      formData.append('image', event.target.files[0])

      try {
        const response = await uploadProductImage(formData).unwrap()
        toast.success(response.message, {position: "top-center"})
        setImage(response.image)
      } catch (error) {
        toast.error(error?.data?.message || error.error, {position: "top-center"})
      }
    }

    const handleSubmitProduct = async (event) => {
      event.preventDefault()

      try {
        const productData = {
          image,
          name,
          brand,
          quantity,
          category,
          description,
          price,
          CountInStock,
        };

        console.log(productData)
        const {data} = await createProduct(productData)

        if(data.error) {
          toast.error("Your product submission failed, try again please", {position: "top-center"})
        } else {
          toast.success(`${data.name} has successfuly been created`, {position: "top-center"})
          navigate("/")
        }

      } catch (error) {
        console.error(error)
        toast.error("Your product submission failed, try again please", {position: "top-center"})
      }
    }

  return(
    <div className="flex items-center justify-center mt-1">
    <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
      <div className="flex justify-end">
        <AdminNav />
      </div>
    <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto mb-8">
            <h1 className="font-semibold leading-6 text-gray-900 text-2xl pb-5">
              Manage Products
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              You can manage your products from this page. You can upload an image for a new product and input information about the item. 
            </p>
          </div>
        </div>
        
    <form onSubmit={handleSubmitProduct}>
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Upload an Image</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            You can start by uploading an image of the product you wish to sell.
          </p>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">

          <div className="col-span-full">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Product photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                  <label
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 hover:text-blue-500"
                  >
                    <span>{image ? image.name : "Upload an Image"}</span>
                    <input id="file-upload" name="image" type="file" accept="image/*" onChange={uploadFileHandler} className={!image ? "hidden" : "text-black"}/>
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG or WEBP</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Product Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">You can add information about the product such as name, brand, description, price, qauntity, amount in stock and which category of products it belongs to.</p>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Product Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Brand
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="brand"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Price
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="price"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="block w-full rounded-md border-0 pl-3 py-1.5 pr-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Quantity
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                className="block w-full rounded-md border-0 pl-3 py-1.5 pr-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Category
            </label>
            <div className="mt-2">
              <select
                name="category"
                onChange={e => setCategory(e.target.value)}
                className="block w-full rounded-md border-0 pl-2 pr-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >{categories?.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}</select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Amount In Stock
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="Instock"
                value={CountInStock}
                onChange={e => setCountInStock(e.target.value)}
                className="block w-full rounded-md border-0 pl-3 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
            
          </div>

          <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Description & Features
              </label>
              <div className="mt-2">
                <textarea
                type="text"
                  name="description"
                  rows={5}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
              <button
              onClick={handleSubmitProduct}
              className="flex w-full justify-center mt-5 rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
              Submit 
            </button>
            </div>
        </div>
      </div>
    </div>
    </form>
    </div>
    </div>
  )
};

export default ProductList;
