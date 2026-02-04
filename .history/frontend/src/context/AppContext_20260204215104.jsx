import { useState } from "react";
import { createContext } from "react";
import { server } from "../main";
import axios from "axios";
import { useEffect } from "react";
const AppContext=createContext(null)
export const AppProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [loading ,setLoading]=useState(true)
    const [isAuth ,setIsAuth]=useState(false)
    async function fetchUser(){

        setLoading(true)
        try {
            const {data}=await axios.get(`${server}/api/user/me`,{withCredentials:true});
            setUser(data)
            setIsAuth(true)
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchUser()
    },[])
return(<AppContext.Provider value={{setIsAuth,isAuth,user,setUser,loading}}>{children}</AppContext.Provider>
)}