import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { MdSend } from "react-icons/md";
const Conversation = () => {

    const {id}=useParams()
    const location=useLocation()
    const [receiver,setReceiver]=useState(location.state || null)

    useEffect(()=>{
        if(!receiver){
            axios.get(`/api/user/${id}`)
            .then(res=>setReceiver(res.data))
        }
    },[id,receiver])
  return (
    <div className='h-100  cursor-pointer active:bg-amber-900 shadow-[2px_7px_15px_#000] rounded-2xl ml-5 bg-black w-70'>
<h2 className='bg-amber-300'>TO:{receiver?.fullname}</h2>


<div>
<input type="text" name="" id="" className=' bg-blue-50 w-50 ml-5 rounded-r-2xl text-black '/>
<MdSend className=' ml-60 size-8  reletive bg-amber-400 right-0 rounded-full'/>
</div>
    </div>
  )
}

export default Conversation