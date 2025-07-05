import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router'
import axios from "axios";
import toast from "react-hot-toast";
import { Context, server } from '../main';

function Register() {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const {auth, setAuth, loading, setLoading} = useContext(Context);

const submitHandler=async (e)=>{
  e.preventDefault();
  setLoading(true);
  try {
    const{data}= await axios.post(`${server}/users/new`, {
    name, email, password
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
if(auth){
  setAuth(false);
  return <Navigate to={"/login"}/>
} 
  return (
     <div className="login">
            <section>
                <form action="" onSubmit={submitHandler}>
                  <input 
                  type="text" 
                  name="name" id="name" 
                  value={name} 
                  onChange={(e)=>setName(e.target.value)} 
                  placeholder='Name'
                  required/>
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
                    <button disabled={loading} type="submit">Sign up</button>
                    <h4> or </h4>
                    <Link to={"/login"}>Log In</Link>
                </form>
            </section>
        </div>
  )
}

export default Register