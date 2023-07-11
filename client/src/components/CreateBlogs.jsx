import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BlogContext from "../context/BlogContext";
import Navbar from "./Navbar";

const CreateBlogs = () => {
  const context = useContext(BlogContext);
  const navigate = useNavigate();
  const { createBlogs } = context;
  const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [cover,setCover] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const formdata = new FormData();
  formdata.append('title',title);
  formdata.append('coverImage',coverImage);
  formdata.append('cover',cover);
  formdata.append('desc',desc);

  const handleClick = (e) => {
    e.preventDefault();
    createBlogs(formdata);
    navigate("/myBlogs");
  }

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate('/login');
    }
  })

  // const onChange = (e) => {
  //   setBlog({...blog, [e.target.name] : e.target.value});
  // }

  return (
    <>
    <Navbar></Navbar>
    <div className="mx-20 my-5">
      <form action="">
        <h1
          className="text-black border-slate-400 border-b-4 w-max
          py-2 font-Poppins text-2xl font-semibold"
          >
          Create Your Blog
        </h1>
        <div className="flex justify-center">
          <div className="rounded-lg w-full h-max shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] flex flex-col my-10 p-10">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="text-teal-400 font-Poppins text-xl font-semibold mr-4"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                value={title}  onChange={ev => setTitle(ev.target.value)}
                className="h-10 w-1/3 font-Poppins border-b-2 py-2 px-2 text-slate-400 border-black"
                maxLength={50}
                />
            </div>
            <div className="mb-6 flex items-center">
              <label
                htmlFor="file"
                className="text-teal-400 font-Poppins text-xl font-semibold mr-4"
                >
                Cover Image
              </label>
              <input type="file" name="coverImage"  onChange={ev => setCoverImage(ev.target.files[0])}/>
              <p className="ml-4 text-red-500">
                (Only png file is supported)
              </p>
            </div>
            <div className="mb-6 flex items-center">
              <label
                htmlFor="cover"
                className="text-teal-400 font-Poppins text-xl font-semibold mr-4"
                >
                Cover Text
              </label>
              <input
                type="text"
                name="cover"
                value={cover}  onChange={ev => setCover(ev.target.value)}
                className="h-10 w-1/2 font-Poppins border-b-2 py-2 px-2 text-slate-400 border-black"
                maxLength={100}
                />
              <p className="ml-4 text-red-500">
                (Write a cover text which will attract more People)
              </p>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="desc"
                className="text-teal-400 font-Poppins text-xl font-semibold mr-4"
                >
                Description
              </label>
              <textarea
                name="desc"
                id=""
                cols="30"
                value={desc}  onChange={ev => setDesc(ev.target.value)}
                rows="10"
                className="border-slate-400 border-4 rounded-md mt-6 p-2 font-Poppins"
                ></textarea>
            </div>
          </div>
        </div>
        <button onClick={handleClick} className = "w-full text-center bg-teal-400 py-3 font-Poppins font-bold text-xl text-white rounded-md transition-all duration-300 hover:bg-black hover:text-teal-400">Create it</button>
      </form>
    </div>
  </>
  );
};

export default CreateBlogs;
