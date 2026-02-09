import React from 'react'
import { AppData } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {logoutUser}=AppData()
  const navigate =useNavigate()
  return (
    <div className='flex w-[25] m-auto mt-40'>
    <button onClick={()=>logoutUser(navigate)} className='bg-red-500 text-white rounded-2xl'>Logout</button>
  </div>
  
  )
}

export default Home