import React from 'react'
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import BlogContext from '../context/BlogContext';
import Navbar from './Navbar';

const host = 'http://localhost:4000';

const EditBlog = (props) => {
  const navigate = useNavigate();
    const [blog,setBlog] = useState({id : "", title : "", desc : "", cover : ""});
    const id = useParams().id;
    const context = useContext(BlogContext);
    const {editBlog} = context;
    const specificBlog = async()=>{
    const res = await fetch(`${host}/api/blog/getBlog/${id}`, {
        method : "GET",
        headers : {
            'Content-Type' : 'application/json',
            "auth-token" : localStorage.getItem('token')
        }
    })
    const json = await res.json();
    setBlog(json);
    }

    useEffect(()=>{
      specificBlog();
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleClick = () => {
      editBlog(id, blog.title, blog.desc, blog.cover);
      navigate("/myBlogs");
    }

    const onChange = (e)=>{
      setBlog({...blog, [e.target.name]: e.target.value});
    }

    let liked = false;

    // const likeHandler = (e) => {
    //   e.preventDefault();
    //   liked = !liked;
    //   console.log(liked);
    // }

  return (
    <>
    <Navbar></Navbar>
    <div className='flex flex-col mx-auto items-center w-11/12 lg:w-10/12'>
      <div className='w-full'>
        <h1 className='text-xl font-Poppins font-bold text-gray-400 border-b-4 w-max py-2 border-black'>Edit Blog</h1>
        <div className = "py-3 w-full">
          <form action="" className = "flex flex-col w-full">
            <input type="text" className = "border-2 border-teal-400 font-Poppins m-4 p-2 text-md" name = "title" value={blog.title} onChange = {onChange}/>
            <input type="text" value={blog.cover} onChange={onChange} name = "cover" className = "border-2 p-2 text-md border-teal-400 font-Poppins m-4"/>
            <textarea type="text" value={blog.desc} onChange={onChange} name = "desc" className = "p-2 text-md border-2 border-teal-400 font-Poppins m-4"/>
            <button onClick={handleClick} className = "w-full py-2 px-3 rounded-md mx-1 text-center text-teal-400 bg-black transition-all duration-300 hover:bg-teal-400 hover:text-white my-2 font-Poppins">Edit it</button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default EditBlog