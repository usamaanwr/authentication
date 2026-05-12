import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
const AuthContext = createContext(null)
export const AuthProvider = ({children})=>{
    const [user , setUser] = useState(null)
    const [isLoading , setIsLoading] = useState(true)

    useEffect(()=>{
        const fetchUser = async ()=>{
            try {
                const res = await axiosInstance.get("/user/current-use")
                console.log(res.data.data);
                
                setUser(res.data?.data)
            } catch (error) {
                setUser(null)
            }finally{
                setIsLoading(false)
            }
        }
        fetchUser()
    },[])
    const login = (userData)=>{
        setUser(userData)
    }

    const logout = async ()=>{
        try {
            await axiosInstance.post("/user/logout")
        } catch (error) {
            console.log(error);
            
        }finally{
            setUser(null)
        }
    }
    return(
        <AuthContext.Provider value={{user , isLoading , login , logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth =  ()=> useContext(AuthContext)