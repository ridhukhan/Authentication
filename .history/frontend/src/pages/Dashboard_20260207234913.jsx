import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { server } from '../main'

const Dashboard = () => {
const [content,setContent]=useState("")
  async function fetchAdminData(){
    try {
   const {data}  = await axios.get(`${server}/api/user/admin`)
   
  setContent(data.message)
  
  } 
    
    catch (error) {
      toast.error(error.response.data.message)
    }
  }
  useEffect(()=>{
     fetchAdminData()
  },[])
  return (
  <>
  {
    content &&   <div>{content}</div>
  }
  </>
  )
}

export default Dashboard