import { Fragment} from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  ComputerDesktopIcon,
  PlusCircleIcon,
  TagIcon,
  ClipboardDocumentListIcon,
  UsersIcon
} from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const AdminNav = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
    <div>
      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-sky-500 hover:bg-sky-700">
        Options
        <ChevronDownIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
      </Menu.Button>
    </div>

    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <NavLink
              to="/admin/dashboard"
                className={classNames(
                  active ? 'bg-blue-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm'
                )}
              >
                <ComputerDesktopIcon
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-700"
                  aria-hidden="true"
                />
                Admin Dashboard
              </NavLink>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <NavLink
              to="/admin/allproductslist"
                className={classNames(
                  active ? 'bg-blue-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm'
                )}
              >
                <DocumentDuplicateIcon
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-700"
                  aria-hidden="true"
                />
                All Products
              </NavLink>
            )}
          </Menu.Item>
        </div>
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <NavLink
              to="/admin/productlist"
                className={classNames(
                  active ? 'bg-blue-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm'
                )}
              >
                <PlusCircleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-700" aria-hidden="true" />
                Create Product
              </NavLink>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <NavLink
              to="/admin/categorylist"
                className={classNames(
                  active ? 'bg-blue-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm'
                )}
              >
                <TagIcon
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-700"
                  aria-hidden="true"
                />
                Create Categories
              </NavLink>
            )}
          </Menu.Item>
        </div>
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <NavLink
              to="/admin/userlist"
                className={classNames(
                  active ? 'bg-blue-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm'
                )}
              >
                <ClipboardDocumentListIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-700" aria-hidden="true" />
                Manage Orders
              </NavLink>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <NavLink
              to="/admin/userlist"
                className={classNames(
                  active ? 'bg-blue-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm'
                )}
              >
                <UsersIcon
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-700"
                  aria-hidden="true"
                />
                Manage Users
              </NavLink>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
  )
}

export default AdminNav