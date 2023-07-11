import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogContext from '../context/BlogContext'
import Blog from './Blog';
import Navbar from './Navbar';

const Home = () => {
  const navigate = useNavigate();
  const context = useContext(BlogContext);
  const {blogs, getBlogs} = context;

  useEffect(()=>{
    if(localStorage.getItem('token')){
      getBlogs();
    }else{
      navigate('/login');
    }
  },[]);

  return (
    <>
    <Navbar></Navbar>
    <div className='flex w-full justify-center'>
      <div className='xs:w-10/12 sm:w-3/4 m-4'>
      <h1 className='text-3xl font-bold py-2 border-b-4 w-max border-b-black text-slate-400 font-Poppins'>Blogs</h1>
      <div className='flex flex-col md:grid md:grid-cols-2 mt-5'>
      {blogs.map((blog) => {
        return <Blog key = {blog._id} blog = {blog}></Blog>
      })}
      </div>
      </div>
    </div>
      </>
  )
}

export default Home