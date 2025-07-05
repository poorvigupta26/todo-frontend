import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router";
import App from './App.jsx'
import "./styles/App.scss";
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import path from 'path';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

export const server ="https://dailydally.onrender.com";

const appRoutes = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/myProfile",
        element:<Profile/>
      },
      {path:"/login",
      element:<Login/>},
      {
        path:"/signup",
        element:<Register/>
      }
    ]
  }
])

 export const Context = createContext({auth:false});

const AppWrapper =({children})=>{
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  return(
    <Context.Provider value={
      {auth,
      setAuth,
      loading,
      setLoading}
    }>
      {children}
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper>
      <RouterProvider router={appRoutes}/>
    </AppWrapper>
    </StrictMode>
 
)
