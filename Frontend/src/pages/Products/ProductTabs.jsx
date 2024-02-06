import { Fragment } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Ratings from '../../components/Ratings'
import { useGetTopProductsQuery } from '../../redux/api/productAPISlice'
import Loader from '../../components/Loader'
import { Tab } from '@headlessui/react'

const ProductTabs = ({loadingProductReview, userInfo, submitHandler, rating, setRating, comment, setComment, product}) => {
  
    const {data, isLoading} = useGetTopProductsQuery()

    if(isLoading) {
        return <Loader />
    }

      function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
  
    return (
        <div className="mx-auto mt-20 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
        <Tab.Group as="div">
          <div className="border-b border-gray-200">
            <Tab.List className="-mb-px flex space-x-8">
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? 'border-blue-600 text-blue-600 focus:outline-none'
                      : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                  )
                }
              >
                Customer Reviews
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? 'border-blue-600 text-blue-600 focus:outline-none'
                      : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                  )
                }
              >
                Leave a review
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? 'border-blue-600 text-blue-600 focus:outline-none'
                      : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                  )
                }
              >
                More Products
              </Tab>
            </Tab.List>
          </div>
          <Tab.Panels as={Fragment}>
          <Tab.Panel className="-mb-10">
                        <h3 className="sr-only">Customer Reviews</h3>
                        {product && product.reviews && product.reviews.length === 0 && <p className='p-5 font-semibold text-gray-800'>No Reviews</p>}
                        
                        <ul role="list" className="divide-y divide-gray-100">
                        {product && product.reviews && product.reviews.map((review) => (
                                <li key={comment.id} className="flex gap-x-4 py-5">
                                    <div className="flex-auto">
                                    <div className="flex items-baseline justify-between gap-x-4">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{review.name}</p>
                                    <p className="flex-none text-xs text-gray-600">
                                    {review.createdAt.substring(0, 10)}
                                    </p>
                                    </div>
                                    <div className='py-1'> 
                                    <Ratings value={review.rating} />
                                    </div>
                                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">{review.comment}</p>
                                </div>
                                </li>
                            ))}
                            </ul>
                    </Tab.Panel>

            <Tab.Panel className="text-sm text-gray-500">
              <h3 className="sr-only">Leave a review</h3>

        
            </Tab.Panel>

            <Tab.Panel className="pt-10">
              <h3 className="sr-only">More Products</h3>

            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
  )
}

export default ProductTabs