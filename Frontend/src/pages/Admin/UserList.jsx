import { useEffect, useState } from "react"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import {   useGetUserQuery,
    useDeleteUserMutation,
    useUpdateUserMutation} from "../../redux/api/usersAPISlice"
import Message from "../../components/Message";
import { FaRegEdit, FaCheck, FaTimes, FaTrashAlt } from 'react-icons/fa';
import AdminNav from "./AdminNav";

const UserList = () => {
    const { data: users, refetch, isLoading, error } = useGetUserQuery()
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdateUserMutation()

    const [editUserId, setEditUserId] = useState(null)
    const [editUsername, setEditUsername] = useState('')
    const [editUserEmail, setEditUserEmail] = useState('')

    useEffect(() => {
        refetch();
    }, [refetch]);

    const toggleEdit = (id, username, email) => {
        setEditUserId(id);
        setEditUsername(username);
        setEditUserEmail(email);
      };

      const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
          try {
            await deleteUser(id);
            refetch();
            toast.success("User successfuly deleted", {position: "top-center"})
          } catch (err) {
            toast.error("There was an error while deleting", {position: "top-center"});
          }
        }
      };

      const updateHandler = async (id) => {
        try {
          await updateUser({
            id: id,
            username: editUsername,
            email: editUserEmail,
          });
          setEditUserId(null);
          refetch();
          toast.success("User successfuly updated", {position: "top-center"})
        } catch (err) {
          toast.error("There was an error while updating", {position: "top-center"});
        }
      };

    return (
    <div className="flex items-center justify-center mt-1">
    <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
    <div className="flex justify-end">
        <AdminNav />
      </div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="pt-5 pb-5 font-semibold leading-6 text-gray-900 text-2xl">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users that have accounts currently on Elementum. It shows their id, name, email and whether they are an administrator. You can edit the users email, username or delete the user.
          </p>
        </div>
      </div>
      {isLoading ? ( <Loader/>) : error ? (<Message variant="danger">
          {error?.data?.message || error.error}
        </Message>) : (
            <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                    ID
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    NAME
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    EMAIL
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    ADMINISTRATOR
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {users.map((user) => (
                  <tr key={user._id} className="even:bg-gray-100">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-800 sm:pl-3">
                      {user._id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                    {editUserId === user._id ? (
                        <div>
                        <input
                        className="p-1"
                          type="text"
                          value={editUsername}
                          onChange={(e) => setEditUsername(e.target.value)}
                        />
                        <button onClick={() => updateHandler(user._id)}>
                        <FaCheck className="text-green-600 mx-1.5"/>
                    </button>
                    <button onClick={() => setEditUserId(null)}>
                        <FaTimes className="text-red-600"/>
                    </button>
                        </div>
                    ) : (
                        <div>
                            {user.username}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaRegEdit className="mx-1 hover:text-blue-600" />
                        </button>
                        </div>
                    )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                    {editUserId === user._id ? (
                        <div>
                        <input
                        className="p-1"
                          type="text"
                          value={editUserEmail}
                          onChange={(e) => setEditUserEmail(e.target.value)}
                        />
                        <button onClick={() => updateHandler(user._id)}>
                        <FaCheck className="text-green-600 mx-1.5"/>
                    </button>
                    <button onClick={() => setEditUserId(null)}>
                        <FaTimes className="text-red-600"/>
                    </button>
                        </div>
                    ) : (
                        <div>
                         <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaRegEdit className="mx-1 hover:text-blue-600" />
                        </button>
                        </div>
                    )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">{user.isAdmin ? (
                        <CheckCircleIcon className="h-6 text-green-600"></CheckCircleIcon>
                    ) : (
                        <XCircleIcon className="h-6 text-red-600"></XCircleIcon>
                    )}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                      {!user.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
        )}
    </div>
    </div>
    )
}

export default UserList