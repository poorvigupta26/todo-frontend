import React, { useEffect, useState } from 'react'
import axios from "axios";
import {server} from "../main";
import TaskCard from '../components/TaskCard';
import toast from 'react-hot-toast';

function Home() {
  const[title, setTitle] = useState("");
  const[desc, setDesc]= useState("");
  const[loading, setLoading] = useState(false);
  const[tasks, setTasks] = useState([]);

  const updateHandler=async(id)=>{
    try {
      const {data}=await axios.put(`${server}/tasks/${id}`,
        {},
        {
          withCredentials:true,
        }
      )
      // toast.success(data.message);
    } catch (error) {
      console.log(error)
      toast.error("error")
    } 
  }

  const deleteHandler=async(id)=>{
    try {
      const{data} = await axios.delete(`${server}/tasks/${id}`,{
        withCredentials:true,
      })
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      
    }
  }

  const submitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.post(`${server}/tasks/add`, {
        title,
        desc,
      },{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json",
        }
      })
      setTitle("");
      setDesc("");
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      setTitle("");
      setDesc("");
      toast.error(error.response.data.message)
      setLoading(false);
    }
  };
  useEffect(()=>{
    axios.get(`${server}/tasks/all`,{
      withCredentials:true,
    }).then((res)=>{
       setTasks(res.data.task);
    }).catch((error)=>{
      toast.error(error.message);
    })
  },[tasks]);

  return (
    <div className="container">
      <div className="login">
        <section>
       <form action="" onSubmit={submitHandler}>
                      <input 
                          type="text"
                          name="title" id="title"
                          value={title}
                          onChange={(e)=>setTitle(e.target.value)}
                          required
                          placeholder='Task Title' />
                          <input
                          type="text"
                          name="" id=""
                          value={desc}
                          onChange={(e)=>setDesc(e.target.value)}
                          required
                          placeholder='Description' />
                          <button disabled={loading}  type="submit">Add Task </button>
                          
                  </form> 
                  </section>
              </div>
              
      <section className="todosContainer">
       { tasks.map((i) => (
          <div>
            <TaskCard title={i.title} 
            desc={i.desc}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}></TaskCard>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Home