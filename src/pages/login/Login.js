import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import "./Login.css";    
import { useNavigate } from 'react-router-dom';
function Login() {
    const [credentials,setCredentials]=useState({
        username:undefined,
        password:undefined
    })
    const {loading,error,dispatch}=useContext(AuthContext)
    const navigate=useNavigate()
    const handleChange=(e)=>{
        setCredentials(prev=>({
            ...prev,[e.target.id]:e.target.value
        }))
    }
    const handleClick=async e=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const res=await axios.post("/auth/login",credentials)
            dispatch({type:"LOGIN_SUCCESS",payload:res.data.details})
            navigate("/")
        }catch(err){
            dispatch({type:"LOGIN_FAILURE",payload:err.response.data})
        }
    }
   
  return (
    <div className='login'>
        <div className='lContainer'>
            <input type="text" className='lInput' id="username" placeholder='username' onChange={handleChange}/>
            <input type="password" className='lInput' id="password" placeholder='password' onChange={handleChange}/>
            <button disabled={loading} onClick={handleClick} className='lButton'>Log In</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login;