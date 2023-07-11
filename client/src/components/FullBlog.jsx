import React, { useEffect, useState } from 'react'
import { json, useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar';

const host = 'http://localhost:4000';

const FullBlog = () => {
    const navigate = useNavigate();
    const [blog,setBlog] = useState([]);
    const id = useParams().id;
    const specificBlog = async()=>{
    const res = await fetch(`${host}/api/blog/getBlog/${id}`, {
        method : "GET",
        headers : {
            "auth-token" : localStorage.getItem('token')
        }
    })
    const json = await res.json();
    setBlog(json);
    return json;
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            specificBlog();
          }else{
            navigate('/login');
          }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    var imageUrl = `${blog.coverImage}`;
    var split = imageUrl.split('/');

    // var likes = blog.likes;
    // console.log(likes);
    // const [like, setLike] = useState(likes);
    const likePost = (id) => {
        fetch('http://localhost:4000/api/blog/like', {
          method : "PUT",
          headers : {
            "Content-Type" : "application/json",
            "auth-token" : localStorage.getItem('token')
          },
          body : JSON.stringify({
            id : id
          })
        }).then(res => res.json());
    }

  return (
    <>
    <Navbar></Navbar>
    <div className='flex justify-center'>
        <div className='rounded-lg xs:w-11/12 sm:w-11/12 md:w-10/12 sm:my-0 lg:w-3/4 h-max shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] flex flex-col items-center my-4'>
            <img src={`http://localhost:4000/uploads/${blog.coverImage}`} alt="" className='h-1/2 w-11/12 rounded-md mt-7'/>
            <div className='w-11/12 my-5'>
                <div className='mb-6'>
                <p className='text-teal-400 font-bold font-Poppins text-4xl my-2'>{blog.title}</p>
                <p className='font-semibold my-3 font-Poppins'>{blog.date}</p>
                <button onClick={() => {likePost(blog._id)}}>Like</button>
                <p className='font-poppins'>{blog.likes}</p>
                <p className='font-semibold font-Poppins text-slate-400'>By : Naivaidya Yadav</p>
                </div>
                <p>{blog.desc}</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default FullBlog