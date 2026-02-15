import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { MdSend } from "react-icons/md";

const Conversation = () => {
  const { id } = useParams()
  const location = useLocation()
  const [receiver, setReceiver] = useState(location.state || null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const bottomRef = useRef()

  // Fetch receiver info if not passed via location.state
  useEffect(() => {
    if (!receiver) {
      axios.get(`/api/user/${id}`, { withCredentials: true })
        .then(res => setReceiver(res.data))
        .catch(err => console.log("Receiver fetch error:", err))
    }
  }, [id, receiver])

  // Fetch messages
  useEffect(() => {
    axios.get(`/api/user/${id}`, { withCredentials: true })
      .then(res => setMessages(res.data))
      .catch(err => console.log("Messages fetch error:", err))
  }, [id])

  // Auto scroll to bottom when messages update
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
        {messages.map(msg => (
          <div
            key={msg._id}
            className={`max-w-xs p-2 rounded-xl ${
              msg.sender && receiver?._id && msg.sender.toString() === receiver._id.toString()
                ? "bg-gray-600"
                : "bg-amber-500 ml-auto"
            }`}
          >
            {msg.text}
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
