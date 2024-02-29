import { Link } from "react-router-dom"
import moment from 'moment'
import { useAllProductsQuery } from "../../redux/api/productAPISlice"
import AdminNav from "./AdminNav"
import { ArrowRightIcon } from '@heroicons/react/20/solid'


const AllProducts = () => {

   const {data: products, isLoading, isError} = useAllProductsQuery() 

    if(isLoading) {
        return <div className="flex justify-center">
        <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    }

    if(isError) {
        return <div>Error loading all products</div>
    }
  return (
    <div className="flex items-center justify-center mt-1">
    <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
    <div className="flex justify-end">
        <AdminNav />
      </div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="pt-5 pb-5 font-semibold leading-6 text-gray-900 text-2xl"> List of all Products ({products.length})</h1>
          <p className="mt-2 mb-5 text-sm text-gray-700">
            In this section all products that are currently saved in the database and displayed on the site to customers are available here. You can click on the update product button to update the products details.
          </p>
        </div>
      </div>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product._id} className="col-span-1 divide-gray-200 rounded-lg bg-white shadow">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-4">
                <h3 className="truncate text-sm font-medium text-gray-900">{product.name}</h3>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">{product.brand}</p>
              <p className="mt-1 truncate text-xs text-gray-600">{moment(product.createdAt).format("MMMM Do YYYY")}</p>
            </div>
            <img src={product.image} className="h-20 w-20 content-center object-cover rounded-full bg-gray-300" alt={product.name}/>
          </div>
          <p className="px-6 text-sm pb-2 text-gray-700">{product?.description?.substring(0, 160)}...</p>
          <div className="border-t-black">
            <div className="-mt-px flex hover:bg-blue-200 rounded-b-md hover:text-gray-700">
                <Link
                  to={`/admin/product/update/${product._id}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-500 hover:text-gray-700"
                > 
                  <ArrowRightIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" aria-hidden="true" />
                  Update Product
                </Link>
              </div>
          </div>
        </li>
      ))}
    </ul>
      </div>
      </div>
  )
}

export default AllProducts