import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import { setCredientials } from "../../redux/features/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { useProfileMutation } from "../../redux/api/usersAPISlice"
import logo from "../../images/logo8.svg"
import { ChevronRightIcon } from "@heroicons/react/24/outline";


const Profile = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')

    const {userInfo} = useSelector(state => state.auth)

    const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation()

    const dispatch = useDispatch()

    useEffect(() => {
        setUsername(userInfo.username)
        setEmail(userInfo.email) 
    }, [userInfo.username, userInfo.email])

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
        } else {
          try {
            const result = await updateProfile({ _id: userInfo._id, username, email, password }).unwrap();
            dispatch(setCredientials({ ...result }));
            toast.success("Profile succesfully updated!");
          } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || error.message);
          }
        }
      };

      const pages = [
        { name: 'Update Credentials', to:"/profile", current: false },
        { name: 'My Orders', to: '/user-orders', current: true },
      ]

    return(
        <>
        <nav className="flex justify-center" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          {pages.map((page) => (
            <li key={page.name}>
              <div className="flex items-center">
                <ChevronRightIcon className="h-5 w-5"></ChevronRightIcon>
                <NavLink
                  to={page.to}
                  className="ml-4 text-sm font-medium text-blue-500 hover:text-blue-700"
                  aria-current={page.current ? 'page' : undefined}
                >
                  {page.name}
                </NavLink>
              </div>
            </li>
          ))}
        </ol>
      </nav>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-24 w-auto" src={logo} alt="logo" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            <span className="text-sky-600">Update</span> your credentials
          </h2>
        </div>
  
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitHandler} method="POST">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
            <div>
              <div className="flex items-center">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
            <div>
              <button
                type="submit"
                disabled={loadingUpdateProfile}
                className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                {loadingUpdateProfile ? "Updating..." : "Update"}
              </button>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
      </>
    )
}

export default Profile