import { Fragment } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Ratings from '../../components/Ratings'
import { useGetTopProductsQuery } from '../../redux/api/productAPISlice'
import Loader from '../../components/Loader'
import { Tab } from '@headlessui/react'

const ProductTabs = ({loadingProductReview, userInfo, submitHandler, rating, setRating, comment, setComment, product}) => {
  
    const {data, isLoading} = useGetTopProductsQuery()

    const [activeTab, setActiveTab] = useState(1)

    if(isLoading) {
        return <Loader />
    }

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
      };

      function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
  
    return (
        <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
        <Tab.Group as="div">
          <div className="border-b border-gray-200">
            <Tab.List className="-mb-px flex space-x-8">
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? 'border-indigo-600 text-indigo-600'
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
                      ? 'border-indigo-600 text-indigo-600'
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
                      ? 'border-indigo-600 text-indigo-600'
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
                    <p className="sr-only">{rating} out of 5 stars</p>
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