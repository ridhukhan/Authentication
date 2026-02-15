import React from 'react'
import { AppData } from '../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
const Home = () => {
  const {logoutUser,user}=AppData()
  const navigate =useNavigate()
  return (
    <div className='flex w-[100px] m-auto mt-40'>
    <button
     onClick={()=>logoutUser(navigate)} className='bg-red-500 text-white rounded-2xl'>
      Logout</button>

      {user && user.role==="admin" && (
        <Link to="/dashboard" className='bg-amber-600 text-black rounded-2xl'>DASHBOARD</Link>
      )}
  </div>
  
  )
}

export default Home