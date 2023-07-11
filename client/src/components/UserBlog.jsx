import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import BlogContext from '../context/BlogContext';
import EditBlog from './EditBlog';
import FullBlog from './FullBlog';

const UserBlog = (props) => {
    const navigate = useNavigate();
    const context = useContext(BlogContext);
    const {userBlogs,deleteBlog} = context;
    const {blog} = props;

    useEffect(() => {
        if(localStorage.getItem('token')){
            userBlogs();
          }else{
            navigate('/login');
          }
    })
  return (
    <div className="border-2 border-teal-700 px-2 py-2 m-4 font-Poppins rounded-md max-w-full">
        <div className='flex flex-col px-2 py-2'>
            <img srcset = {`http://localhost:4000/uploads/${blog.coverImage}`} alt="" className='h-40 w-auto rounded-md'/>
            <div className='my-2 flex flex-col justify-between'>
            <div>
                <p className='text-teal-400 font-semibold text-xl'>{blog.title}</p>
                <p className='text-md font-medium my-2'>{blog.cover}</p>
            </div>
            <div>
                <Link to={`/blog/${blog._id}`} className='py-2 xs:px-3 xs:text-[10px] sm:text-[14px] md:px-6 mr-1 rounded-md text-teal-400 bg-black transition-all duration-300 hover:bg-teal-400 hover:text-white' onClick={<FullBlog></FullBlog>}>Read More</Link>
                <Link to={`/editBlog/${blog._id}`} className='py-2 px-3 xs:text-[10px] sm:text-[14px] rounded-md mx-1 text-teal-400 bg-black transition-all duration-300 hover:bg-teal-400 hover:text-white' onClick={<EditBlog blog = {blog}></EditBlog>}>Update</Link>
                <button onClick={() => {deleteBlog(blog._id)}} className = "py-2 px-3 xs:text-[10px] sm:text-[14px] mx-1 bg-teal-400 rounded-md font-Poppins transition-all text-white duration-300 hover:bg-red-500 hover:text-white">Delete</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default UserBlog