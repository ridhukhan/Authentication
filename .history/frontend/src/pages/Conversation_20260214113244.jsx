import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const Conversation = () => {

    const {id}=useParams()
    const location=useLocation()
    const [receiver,setReceiver]=useState(location.state || null)

    useEffect(()=>{
        if(!receiver){
            axios.get(`/api/user/${id}`)
            .then(res=>setReceiver(res.data))
        }
    },[id])
  return (
    <div className='h-100  cursor-pointer active:bg-amber-900 shadow-[2px_7px_15px_#000] rounded-2xl ml-5 bg-black w-70'>
<h2 className='bg-amber-300'>TO:{receiver.fullname}</h2>



    </div>
  )
}

export default Conversation