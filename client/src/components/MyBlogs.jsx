import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import BlogContext from '../context/BlogContext'
import Navbar from './Navbar';
import UserBlog from './UserBlog';

const MyBlogs = () => {
  const navigate = useNavigate();
  const context = useContext(BlogContext);
  const {usersblog,userBlogs} = context;
  useEffect(()=>{
    if(localStorage.getItem('token')){
      userBlogs();
    }else{
      navigate('/login');
    }

     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return (
    <>
    <Navbar></Navbar>
    <div className='w-full xs:px-4 lg:px-20 py-5'>
      <h1 className='font-Poppins text-3xl font-semibold text-slate-500 m-4 border-b-4 border-black w-max'>Your Blogs</h1>
      {usersblog.length===0 && 'No blogs to display'}
      <div className = "grid xs:grid-cols-1 md:grid-cols-2 justify-evenly sm:grid-flow-row">
        {usersblog.map((blog)=>{
          return <UserBlog key = {blog._id} blog = {blog}></UserBlog>
        })}
        </div>
    </div>
        </>
  )
}

export default MyBlogs