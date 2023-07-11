import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [credentials, setCredentials] = useState({username : "",email : "", password : ""});
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/auth/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username : credentials.username,email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    if (json.success){
        localStorage.setItem('token', json.authToken); 
        navigate("/");
    }
    else{
        alert("Invalid credentials");
    }
}

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name] : e.target.value});
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col items-center shrink sm:shrink-0 border-4 rounded-md shadow-lg p-10'>
      <h1 className='text-xl border-b-2 sm:text-3xl font-bold py-2 sm:border-b-4 w-max border-b-black text-slate-400 font-Poppins'>Register</h1>
        <form action="" className='flex flex-col' onSubmit={handleClick}>
          <input type="text" value = {credentials.username} onChange = {onChange} name = "username" placeholder='Username' className='text-md border-b-2 placeholder:text-xl my-3 active:border-blue-500 p-2 sm:border-b-4 sm:my-6 border-teal-800 font-Poppins sm:text-xl font-bold placeholder:text-teal-700 sm:placeholder:text-2xl'/>
          <input type="text" value = {credentials.email} onChange = {onChange} name = "email" placeholder='Email' className='text-md border-b-2 placeholder:text-xl my-3 active:border-blue-500 p-2 sm:border-b-4 sm:my-6 border-teal-800 font-Poppins text-xl font-bold placeholder:text-teal-700 sm:placeholder:text-2xl'/>
          <input type="text" value = {credentials.password} onChange = {onChange} name = "password" placeholder='Password' className='text-md border-b-2 placeholder:text-xl my-3 active:border-blue-500 p-2 sm:border-b-4 sm:my-6 border-teal-800 font-Poppins text-xl font-bold placeholder:text-teal-700 sm:placeholder:text-2xl'/>
          <button className='w-full py-2 px-3 rounded-md mx-1 text-teal-400 bg-black transition-all duration-300 hover:bg-teal-400 hover:text-white font-Poppins'>Register</button>
          <Link to="/login" className='w-full py-2 px-3 rounded-md mx-1 text-center text-teal-400 bg-black transition-all duration-300 hover:bg-teal-400 hover:text-white my-2 font-Poppins'>Login</Link>
        </form>
      </div>
    </div>
  )
}

export default Register