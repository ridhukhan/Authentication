import React from 'react'
import { AppData } from '../context/AppContext'

const Home = () => {
  const {logoutUser}=AppData()
  return (
    <div className='flex w-[25] m-auto mt-40'>
    <button onClick={logoutUser} className='bg-red-500 text-white rounded-2xl'>Logout</button>
  </div>
  
  )
}

export default Home