import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import store from './store/index.js'
import { Provider } from 'react-redux'

import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import RoutePrivate from './components/RoutePrivate.jsx'
import RouteSA from './components/RouteSA.jsx'
import NotFound404 from './screens/NotFound404.jsx'
import Campaign from './screens/Campaign.jsx'
import AccountScreen from './screens/AccountScreen.jsx'
import HomeLoggedInScreen from './screens/HomeLoggedInScreen.jsx'
import CampaignsScreen from './screens/CampaignsScreen.jsx'
import UsersScreen from './screens/UsersScreen.jsx'
import AccountsScreen from './screens/AccountsScreen.jsx'
// import './index.css'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index= {true} path='/' element={<HomeScreen/>}></Route>
      <Route path='/login' element={<LoginScreen/>}></Route>

{/* Temporarily removing the register option */}
      <Route path='/register' element={<RegisterScreen/>}></Route>
      
      {/* Private routes */}
      <Route path='' element={<RoutePrivate/>}>
        <Route path='/profile' element={<ProfileScreen/>}></Route>
        <Route path='/account' element={<AccountScreen/>}></Route>
        <Route path='/home' element={<HomeLoggedInScreen/>}></Route>
        <Route path='/campaignslist' element={<CampaignsScreen/>}></Route>
        <Route path='/campaign' element={<Campaign/>}></Route>
      </Route>

      <Route path='' element={<RouteSA/>}>
        <Route path='/usersadmin' element={<UsersScreen/>}></Route>
        <Route path='/accountsadmin' element={<AccountsScreen/>}></Route>
      </Route>
      
      <Route path='*' element={<NotFound404/>}></Route>
    </Route>

  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router}/>
      </React.StrictMode>
    </Provider>
)
