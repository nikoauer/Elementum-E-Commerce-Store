import { useGetTopProductsQuery } from "../redux/api/productAPISlice"
import Loader from "./Loader"

const Header = () => {

    const {data, isLoading, error} = useGetTopProductsQuery
    console.log(data)

    if (isLoading) {
       return <Loader />
    }

    if (error) {
        return <h1>ERROR!</h1>
    }

  return (

    <div className="flex items-center justify-center mt-1">
    <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
       
    </div>
    </div>
  )
}

export default Header