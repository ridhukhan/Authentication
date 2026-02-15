import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { MdSend } from "react-icons/md";
const Conversation = () => {

    const {id}=useParams()
    const location=useLocation()
    const [receiver,setReceiver]=useState(location.state || null)
const [messages,setMessages]=useState([])
const [text,setText]=useState("")
const bottomRef=useRef()
    useEffect(()=>{
        if(!receiver){
            axios.get(`/api/user/${id}`)
            .then(res=>setReceiver(res.data))
        }
    },[id,receiver]);

    useEffect(()=>{
axios.get(`/api/user/${id}`,{
    withCredentials:true
}
).then(res=>setMessages(res.data))

    },[id])

useEffect(()=>{
    bottomRef.current?.scrollIntoView({
        behavior:"smooth"
    },[messages])
})
    const SendMessagge=async()=>{
        if(!text.trim()) return
        const {data}= await axios.post(`/api/user/send/${id}`,
            {message:text},
            {withCredentials:true}
        )
        setMessages(prev=>[...prev,data])
        setText("")
    }
  return (
    <div className='h-100  cursor-pointer active:bg-amber-900 shadow-[2px_7px_15px_#000] rounded-2xl ml-5 bg-black w-70'>
<h2 className='bg-amber-300'>TO:{receiver?.fullname}</h2>
<div className="flex-1 overflow-y-auto p-3 space-y-2">

{messages.map(msg=>(
    <div key={msg._id}
    
    className={`max-w-xs p-2 rounded-xl  
        
        ${msg.sender.toString() === receiver._id.toString() ? "bg-gray-600" : "bg-amber-500 ml-auto"}`}
    >
{msg.text}
    </div>
))}
<div ref={bottomRef}/>
</div>

<div className='mt-80'>
<input
value={text}
onChange={e=>setText(e.target.value)}
type="text" name="" id="" className=' bg-blue-50 w-50 ml-5 rounded-r-2xl text-black '/>

<button  onClick={SendMessagge}
className=' ml-55 size-8  reletive bg-amber-400 right-0 rounded-full'
>

<MdSend size={20}/>

</button>
</div>
    </div>
  )
}

export default Conversation