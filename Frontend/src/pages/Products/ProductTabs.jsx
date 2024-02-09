import { Fragment } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Ratings from '../../components/Ratings'
import { useGetTopProductsQuery } from '../../redux/api/productAPISlice'
import Loader from '../../components/Loader'
import { Tab } from '@headlessui/react'
import Product from './Product'

const ProductTabs = ({loadingProductReview, userInfo, submitHandler, rating, setRating, comment, setComment, product}) => {
  
    const {data, isLoading} = useGetTopProductsQuery()

    if(isLoading) {
        return <Loader />
    }

      function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
  
    return (
        <div className="mx-auto mt-10 w-full lg:col-span-4 lg:mt-0 lg:max-w-none">
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
          <Tab.Panel className="mb-10">
                        <h3 className="sr-only">Customer Reviews</h3>
                        {product && product.reviews && product.reviews.length === 0 && <p className='p-5 font-semibold text-gray-800'>No Reviews</p>}
                        
                        <ul role="list" className="divide-y divide-gray-100">
                        {product && product.reviews && product.reviews.map((review) => (
                                <li key={review._id} className="flex gap-x-4 py-5">
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

            <Tab.Panel >
              <h3 className="sr-only">Leave a review</h3>
                <section>
                    {userInfo ? (
                        <form onSubmit={submitHandler} className='p-5'>
                            <label htmlFor="rating" name='rating' className='block mb-2 text-md font-medium text-gray-800'>Rate this product</label>
                            <select id="rating" required value={rating} onChange={e => setRating(e.target.value)}
                            name='rating'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2'>
                                <option value="">Select a rating</option>
                                <option value="1">Bad</option>
                                <option value="2">Poor</option>
                                <option value="3">Average</option>
                                <option value="4">Good</option>
                                <option value="5">Excellent</option>
                            </select>
                            <label htmlFor="comment" className='block mb-2 text-md font-medium text-gray-800'>Add a Comment</label>
                            <div className="mt-2">
                                <textarea
                                rows={4}
                                placeholder='What did you think of this product?'
                                id="comment"
                                name='comment'
                                className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                required
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                />
                            </div>
                            <button type='submit' disabled={loadingProductReview}
                            className='rounded bg-sky-600 my-4 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'>
                                Submit Review
                            </button>
                        </form>
                    ) : (
                        <p className='p-5 font-semibold text-gray-800'>
                            Please <Link className='hover:text-sky-700 text-sky-600' to='/login'>login</Link> to leave a review.
                        </p>
                    )}
                </section>
            </Tab.Panel>

            <Tab.Panel className="pt-10">
              <h3 className="sr-only">More Products</h3>
              <section className="flex flex-wrap justify-between">
                    {!data ? (
                    <Loader />
                    ) : (
                    data.map((product) => (
                        <div key={product._id} className="w-full sm:w-1/2 lg:w-1/3">
                            <div className='mx-4'>
                                <Product product={product}/>
                            </div>
                        </div>
                    ))
                    )}
                </section>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
  )
}

export default ProductTabs