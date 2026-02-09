import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import api from "../apiinterchapter";
import { toast } from "sonner";
const AppContext=createContext(null)
export const AppProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [loading ,setLoading]=useState(true)
    const [isAuth ,setIsAuth]=useState(false)
    async function fetchUser(){

        setLoading(true)
        try {
            const {data}=await api.get(`/api/user/me`);
            setUser(data)
            setIsAuth(true)
        } catch (error) {
           console.log("STATUS:", error.response?.status);
   console.log("DATA:", error.response?.data);
        }finally{
            setLoading(false)
        }
    }

    async function logoutUser(){
        try {
            const {data}= await api.post("/api/user/logout")
            toast.success(data.message)
            setIsAuth(false)
            setUser(null)
        } catch (error) {
            toast.error("something went wrong")
        }
    }
    useEffect(()=>{
        fetchUser()
    },[])
return(<AppContext.Provider value={{setIsAuth,isAuth,user,setUser,loading,logoutUser}}>{children}</AppContext.Provider>
);
};
export const AppData=()=>{
    const context=useContext(AppContext)
    if(!context) throw new Error("AppData must be used Appprovider");
    return context;
}