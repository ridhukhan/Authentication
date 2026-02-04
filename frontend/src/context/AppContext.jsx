import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import api from "../apiinterchapter";
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
            console.error(error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchUser()
    },[])
return(<AppContext.Provider value={{setIsAuth,isAuth,user,setUser,loading}}>{children}</AppContext.Provider>
);
};
export const AppData=()=>{
    const context=useContext(AppData)
    if(!context) throw new Error("AppData must be used Appprovider");
    return context;
}