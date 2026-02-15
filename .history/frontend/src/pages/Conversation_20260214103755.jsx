import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

const Conversation = () => {

    const {id}=useParams()
    const location=useLocation()
    const receiver=location.state
  return (
    <div>
<h2>TO:{receiver.fullname}</h2>



    </div>
  )
}

export default Conversation