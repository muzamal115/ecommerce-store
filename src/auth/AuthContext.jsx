import { createContext, useContext, useEffect, useState } from "react";
import { firebaseApp } from "../context/Firebase";
import { onAuthStateChanged, signOut ,getAuth} from "firebase/auth"

   export const auth= getAuth(firebaseApp)

   const AuthContext=createContext()

   export  const AuthProvider=({children})=>{

    const[user,setUser]=useState(null)
    const[loading,setLoading]=useState(true)

  useEffect(()=>{
  
  const unsub=onAuthStateChanged(auth,(u)=>{
    setUser(u)
    setLoading(false)
  })
   return ()=>unsub()
  },[])  

  const logout=()=>signOut(auth)
  return( 
     <AuthContext.Provider
       value={{
        user,
        loading,
        logout
        
        }}>
        {children}
    </AuthContext.Provider>
    )
   }
   export const useAuth=()=>useContext(AuthContext)
    