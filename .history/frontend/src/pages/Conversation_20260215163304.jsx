import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { MdSend } from "react-icons/md";
import { useSocket } from '../context/SocketContext';

const Conversation = () => {
  const { id } = useParams()
  const location = useLocation()
  const [receiver, setReceiver] = useState(location.state || null)
  const [messages, setMessages] = useState([])  // ✅ Empty array by default
  const [text, setText] = useState("")
  const bottomRef = useRef()
const {socket} =useSocket()
  // Fetch receiver info
  useEffect(() => {
    if (!receiver) {
      axios.get(`/api/user/profile/${id}`, { withCredentials: true })
        .then(res => setReceiver(res.data))
        .catch(err => console.log("Receiver fetch error:", err))
    }
  }, [id, receiver])

  // Fetch messages
  useEffect(() => {
    axios.get(`/api/user/${id}`, { withCredentials: true })
      .then(res => {
        // ✅ Check if array, if not set empty array
        setMessages(Array.isArray(res.data) ? res.data : [])
      })
      .catch(err => {
        console.log("Messages fetch error:", err)
        setMessages([])  // ✅ On error, set empty array
      })
  }, [id])

  useEffect(()=>{
   if(!socket) return

   socket.on("newMessage",(newMessage)=>{
    if(newMessage.senderId=== id || newMessage.receiverId===id){
      setMessages(prev=>[...prev,newMessage])
    }
   })
   return ()=> socket.off("newMessage")
 },[socket,id])

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!text.trim()) return
    try {
      const { data } = await axios.post(
        `/api/user/send/${id}`,
        { message: text },
        { withCredentials: true }
      )
      setMessages(prev => [...prev, data])
      setText("")
    } catch (error) {
      console.log("Send message error:", error)
    }
  }

  return (
    <div className='h-100 cursor-pointer shadow-[2px_7px_15px_#000] rounded-2xl ml-5 bg-black w-70 flex flex-col'>
      <h2 className='bg-amber-300 p-2'>TO: {receiver?.fullname || "Loading..."}</h2>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {/* ✅ ONLY change - array check before map */}
        {Array.isArray(messages) && messages.map(msg => (
          <div
            key={msg._id}
            className={`max-w-xs p-2 rounded-xl ${
              msg.senderId === id
                ? "bg-gray-600 text-white"
                : "bg-amber-500 ml-auto"
            }`}
          >
            {msg.message}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className='flex p-2 mt-auto bg-gray-100'>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className='flex-1 bg-white p-2 rounded-l-2xl outline-none'
        />
        <button
          onClick={sendMessage}
          className='bg-amber-400 p-2 rounded-r-2xl flex items-center justify-center'
        >
          <MdSend size={20} />
        </button>
      </div>
    </div>
  )
}

export default Conversation