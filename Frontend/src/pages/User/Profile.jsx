import { useEffect, useState } from "react"
import { Toast } from "react-toastify"
import Loader from "../../components/Loader"
import { setCredientials } from "../../redux/features/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useProfileMutation } from "../../redux/api/usersAPISlice"


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

    return(
        <div>Profile</div>
    )
}

export default Profile