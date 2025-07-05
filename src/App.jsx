import { Outlet } from "react-router"
import Header from "./components/Header"
import { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react"
import axios from "axios"
import { Context, server } from "./main"

function App() {

  const{setUser, setAuth, setLoading, user, auth}= useContext(Context);

  useEffect(()=>{
    setLoading(true);
    if(auth)
    {axios.get(`${server}/users/myProfile`,{
      withCredentials:true,
    }).then((res)=>{
      setAuth(true);
      setUser(res.data.user);
      setLoading(false);
    }).catch((error)=>{
      setUser({});
      setAuth(false);
      setLoading(false);
    })}
  }, [])

  return (
    <>
    <Header/>
    <Outlet/>
    <Toaster/>
    
    </>
  )
}

export default App
