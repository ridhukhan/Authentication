import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { server } from '../main'

const AllUsers= () => {
  const [users,setUsers]=useState([])
  const fetchUsers=async()=>{
    try {
        const {data}=await axios.get(`${server}/api/user/users`,
        {withCredentials:true}
      )
      setUsers(data)
    } catch (error) {
        console.log(error.message)
    }
  }
  useEffect(()=>{
    fetchUsers()
  },[])
  return (
    <div className='h-50 bg-black w-70'>
  {users.map((user)=>(
<div key={user._id}
     className='h-10 bg-amber-500 text-black w-50 ml-8 rounded-s-2xl rounded-r-2xl mt-5'>

    <h1 className='ml-15'>{user.fullname}</h1>

</div>

  ))}
 </div>
  )
}

export default AllUsers