import React from 'react'
import { Link } from 'react-router-dom';
import FullBlog from './FullBlog';

const Blog = (props) => {
  const {blog} = props;
  return (
    <div className="border-2 border-teal-700 px-2 py-2 m-4 font-Poppins rounded-md max-w-full">
        <div className='flex flex-col px-2 py-2'>
            <img src={`http://localhost:4000/uploads/${blog.coverImage}`} alt="" srcset="" className='h-40 w-auto rounded-md'/>
            <div className='my-4 flex flex-col justify-between'>
            <div>
                <p className='text-teal-400 font-semibold text-xl'>{blog.title}</p>
                <p className='text-md font-medium my-2'>{blog.cover}</p>
            </div>
            <div className='mt-3'>
                <Link to={`/blog/${blog._id}`} className='py-2 px-6 rounded-md text-teal-400 bg-black transition-all duration-300 hover:bg-teal-400 hover:text-white' onClick={<FullBlog></FullBlog>}>Read More</Link>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Blog