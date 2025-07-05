import React, { useContext } from 'react'
import { Context } from '../main';
import Loader from '../components/Loader';

function Profile() {
    const{setAuth, loading, user}= useContext(Context);
    // console.log(user.name);
  return (
    loading?<Loader/>:
    <div>
      <h4>{user.name}</h4>
      <p>{user.email}</p>

    </div>
  )
}

export default Profile