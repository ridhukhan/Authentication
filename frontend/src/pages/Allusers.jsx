import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../main'
import { useNavigate } from 'react-router-dom'

const Allusers = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `${server}/api/user/users`,
        { withCredentials: true }
      )
      setUsers(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const toConversation = (user) => {
    navigate(`/chat/${user._id}`, {
      state: user
    })
  }

  return (
    <div className='h-100 shadow-[2px_7px_15px_#000] rounded-2xl ml-5 bg-black w-70 p-3'>
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => toConversation(user)}
          className='h-10 bg-amber-500 text-black rounded-2xl mt-3 flex items-center justify-center cursor-pointer hover:bg-amber-400'
        >
          <h1>{user.fullname}</h1>
        </div>
      ))}
    </div>
  )
}

export default Allusers
