
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux';
import store from './redux/features/store.js'

//Auth directories
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'

//Private directories
import PrivateRoute from './components/privateRoutes.jsx';
import Profile from './pages/User/Profile.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Register />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>)
