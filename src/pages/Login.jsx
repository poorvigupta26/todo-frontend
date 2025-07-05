import React ,{ useContext, useState } from 'react'
import { Link, Navigate } from 'react-router'
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';


function Login() {

   

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {auth, setAuth, loading, setLoading} = useContext(Context);

    const submitHandler=async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const{data}= await axios.post(`${server}/users/login`, {
            email, password
        }, {
            headers:{
            "Content-Type":"application/json"
            },
            withCredentials: true,
        })
        toast.success(data.message)
        setAuth(true);
        setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false);
        }
}
      if(auth) return <Navigate to={"/"}/>

  return (
    <div className="login">
        <section>
            <form action="" onSubmit={submitHandler}>
                <input 
                    type="email"
                    name="email" id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    placeholder='Email' />
                    <input
                    type="password"
                    name="" id=""
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    placeholder='Password' />
                    <button  disabled={loading} type="submit">Log in</button>
                <h4> or </h4>
                <Link to={"/signup"}>Sign Up</Link>
            </form>
        </section>
    </div>
  )
}

export default Login