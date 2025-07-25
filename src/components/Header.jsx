import React, { useContext } from 'react'
import { Link } from 'react-router'
import { Context, server } from '../main'
import axios from 'axios';
import toast from 'react-hot-toast';

function Header() {

  const {auth, setAuth, loading, setLoading, setUser} = useContext(Context);
  // console.log(auth, "data");

  const logoutHandler=async()=>{
    setLoading(true);
    try {
      const{data}=await axios.get(`${server}/users/logout`,{
        withCredentials:true
      })
      toast.success(data.message);
      setAuth(false);
      setUser({});
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setAuth(true);
      setLoading(false);
    }
  }

  return (
    <>
    <nav className='header'>
        <div>
            <h2> Doozy</h2>
             </div>
        <article>
           {auth?<Link to={"/home"}>Dashboard</Link>:<Link to={"/"}>Home</Link>}
            <Link to={"/myProfile"}>Profile</Link>
            {
              auth?<button disabled={loading} onClick={logoutHandler} className="btn">Logout</button>
              :<Link to={"/login"}>Login</Link>
            }
            
            
        </article>
       
    </nav>
    
    </>
  )
}

export default Header